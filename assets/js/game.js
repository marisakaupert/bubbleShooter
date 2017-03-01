var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
            var Game = function () {
                var currentBubble;
                var board;
                var numberOfBubbles;
                var MAX_BUBBLES = 100;
                this.init = function () {
                    $(".playButton").on('click', startGame);
                    $(window).on('mousemove', trackMouse);
                };
                var trackMouse = function(e){
                  var mouseX = e.clientX;
                  var mouseY = e.clientY;
                  var halfTheScreenX = $(window).width()/2;
                  var halfTheScreenY = $(window).height()/2;
                  var cannonY = $('.shooter').offset().top;
                  var hypotenuseDistance = Math.pow(Math.pow(mouseX - halfTheScreenX, 2) + Math.pow(mouseY - cannonY, 2),0.5);
                  var adjacentDistance = Math.pow(Math.pow(mouseY - cannonY,2),0.5);
                  var oppositeDistance = Math.pow(Math.pow(mouseX - halfTheScreenX,2) + Math.pow(mouseY - halfTheScreenY,2), 0.5);

                  var cos = (Math.pow(adjacentDistance,2) + Math.pow(oppositeDistance,2) - Math.pow(hypotenuseDistance,2)) / (2 * adjacentDistance * oppositeDistance);
                  var angle = Math.acos(cos) * 180 / Math.PI;
                  console.log(angle);


                  rotateCannon(angle);

                }

                var startGame = function () {
                    $(".playButton").unbind('click');
                    numberOfBubbles = MAX_BUBBLES;
                    BubbleShoot.ui.hideDialog();
                    currentBubble = getNextBubble();
                    board = new BubbleShoot.Board();
                    BubbleShoot.ui.drawBoard(board);
                    $("#game").bind('click', clickGameScreen);
                };
                var getNextBubble = function () {
                    var bubble = BubbleShoot.Bubble.create();
                    bubble.getSprite().addClass("currentBubble");
                    $("#board").append(bubble.getSprite());
                    BubbleShoot.ui.drawBubblesRemaining(numberOfBubbles);
                    numberOfBubbles--;
                    return bubble;
                };
                var clickGameScreen = function (e) {
                    var angle = BubbleShoot.ui.getBubbleAngle(currentBubble.getSprite(), e);
                    var duration = 750;
                    var distance = 1000;
                    var collision = BubbleShoot.CollisionDetector.findIntersection(currentBubble, board, angle);
                    if (collision) {
                        var coordinates = collision.coordinates;
                        duration = Math.round(duration * collision.distanceToCollision / distance);
                        board.addBubble(currentBubble, coordinates);
                        var group = board.getGroup(currentBubble, {});
                        if (group.list.length >= 3) {
                            popBubbles(group.list, duration);
                            var orphans = board.findOrphans();
                            var delay = duration + 200 + 30 * group.list.length;
                            dropBubbles(orphans, delay);
                        }
                    } else {
                        var distanceX = Math.sin(angle) * distance;
                        var distanceY = Math.cos(angle) * distance;
                        var bubbleCoordinates = BubbleShoot.ui.getBubbleCoordinates(currentBubble.getSprite());
                        var coordinates = {
                            x: bubbleCoordinates.left + distanceX,
                            y: bubbleCoordinates.top - distanceY
                        };
                    };

                    BubbleShoot.ui.fireBubble(currentBubble, coordinates, duration);
                    currentBubble = getNextBubble();
                };

                var rotateCannon = function(degrees) {
                  // if (degrees >= 65) {
                  //   degrees = 65;
                  // }
                  // if (degrees <= -65) {
                  //   degrees = -65;
                  // }
                  $(".shooter").css({
                    "transform" : "translateX(-50%) rotate(" + degrees + "deg)"
                  });

                }

                var popBubbles = function (bubbles, delay) {
                    $.each(bubbles, function () {
                        var bubble = this;
                        setTimeout(function () {
                            bubble.animatePop();
                        }, delay);
                        board.popBubbleAt(this.getRow(), this.getColumn());
                        setTimeout(function () {
                            bubble.getSprite().remove();
                        }, delay + 200);
                        delay += 60;
                    });
                };



                var dropBubbles = function (bubbles, delay) {
                    $.each(bubbles, function(){
                            var bubble = this;
                            board.popBubbleAt(bubble.getRow(), bubble.getColumn());
                            setTimeout(function(){
                                bubble.getSprite().kaboom();
                              }, delay);
                            });
                        };

                    };
                    return Game;
                })(jQuery);
