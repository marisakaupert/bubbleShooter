var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
            var Game = function () {
                var currentBubble;
                var board;
                var numberOfBubbles;
                var MAX_BUBBLES = 100;
                this.init = function () {
                    $(".playButton").on('click', startGame);
                    $(window).on('mousedown', trackMouse);
                };
                var trackMouse = function(e){
                  var mouseX = e.clientX;
                  var mouseY = e.clientY;
                  var halfTheScreenX = $(window).width()/2;
                  var halfTheScreenY = $(window).height()/2;
                  var cannonY = $('.shooter').offset().top;
                  var cannonLeft = $('.shooter').offset().left;
                  var angle = Math.atan((mouseX - cannonLeft) /
                      (cannonY - mouseY)) * 180/ Math.PI;
                  if (mouseY > cannonY) {
                      angle += 180/ Math.PI;
                  }

                  var bubbleDX = 810 + Math.sin(angle * Math.PI/180) * 200;
                  var bubbleDY = 860 - Math.cos(angle * Math.PI/180) * 200;


                  rotateCannon(angle);
                  // rotateBubble(bubbleDX, bubbleDY, angle);

                }

                var startGame = function () {
                    $(".playButton").unbind('click');
                    numberOfBubbles = MAX_BUBBLES;
                    BubbleShoot.ui.hideDialog();
                    currentBubble = getNextBubble();
                    board = new BubbleShoot.Board();
                    BubbleShoot.ui.drawBoard(board);
                    $("#game").on('mouseup', clickGameScreen);
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
                  if (degrees >= 40) {
                    degrees = 40;
                  }
                  if (degrees <= -40) {
                    degrees = -40;
                  }

                  $(".shooter").css({
                    "transform" : "translateX(-50%) rotate(" + degrees + "deg)"
                  });
                }

                var rotateBubble = function(x,y, angle) {
                  if (angle >= 40) {
                    x = 963;
                    y = 731;
                  }
                  if (angle <= -40) {
                    x = 623;
                    y = 790;
                  }

                  $('.currentBubble').css({
                    left: x,
                    top: y
                  });
                }

                var popBubbles = function (bubbles, delay) {
                    $.each(bubbles, function () {
                        var bubble = this;
                        setTimeout(function () {
                          bubble.setState(BubbleShoot.BubbleState.POPPING);
                            bubble.animatePop();
                            setTimeout(function(){
                              bubble.setState(BubbleShoot.BubbleState.POPPED);
                            }, 200);
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
