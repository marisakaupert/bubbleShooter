var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
    var Game = function () {
        var currentBubble;
        var board;
        var numberOfBubbles;
        var MAX_BUBBLES = 70;
        var POINTS_PER_BUBBLE = 1;
        var MAX_ROWS = 50;
        var level = 0;
        var score = 0;
        var highScore = 0;
        var lastMouseX;
        var lastMouseY;

        this.init = function () {
            $(".playButton").bind('click', startGame);
        };

        var trackMouse = function (e) {
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            if (mouseY > 700) {
                return;
            }
            var halfTheScreenX = $(window).width() / 2;
            var halfTheScreenY = $(window).height() / 2;
            var cannonY = $('.shooter').offset().top;
            var cannonLeft = $('.shooter').offset().left;
            var angle = Math.atan((mouseX - cannonLeft) /
                (cannonY - mouseY)) * 180 / Math.PI;
            if (mouseY > cannonY) {
                angle += 180 / Math.PI;
            }

            rotateCannon(angle);
        }

        var handleMouseMovement = function (e) {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            trackBubble(e.clientX, e.clientY);
        }

        var trackBubble = function (x, y) {
            var mouseX = x;
            var mouseY = y;
            var cannonY = $('.shooter').offset().top;
            var cannonLeft = $('.shooter').offset().left;
            var angle = Math.atan((mouseX - cannonLeft) /
                (cannonY - mouseY)) * 180 / Math.PI;
            if (mouseY > cannonY) {
                angle += 180 / Math.PI;
            }



            var bubbleDX = 899 + Math.sin(angle * Math.PI / 180) * 200;
            var bubbleDY = 899 - Math.cos(angle * Math.PI / 180) * 200;

            rotateBubble(bubbleDX, bubbleDY, angle);


        }

        var startGame = function () {
            $(".playButton").unbind('click');
            numberOfBubbles = MAX_BUBBLES - level * 5;
            BubbleShoot.ui.hideDialog();
            //            $(window).on('mousemove', trackMouse);
            //            $(window).on('mousemove', handleMouseMovement);
            currentBubble = getNextBubble();
            board = new BubbleShoot.Board();
            BubbleShoot.ui.drawBoard(board);
            $("#game").on('click', clickGameScreen);

            BubbleShoot.ui.drawScore(score);
            BubbleShoot.ui.drawLevel(level);


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
                    var popped = [].concat(group.list, orphans);
                    var points = popped.length * POINTS_PER_BUBBLE;
                    score += points;
                    setTimeout(function () {
                        BubbleShoot.ui.drawScore(score);
                    }, delay);
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
            var rowLength = board.findRowLength();
            if (rowLength >= 7) {
                endGame(false);
            } else if (numberOfBubbles == 0) {
                endGame(false);
            } else if (board.isEmpty()) {
                endGame(true);
            } else {
                currentBubble = getNextBubble();
            }

        };

        var rotateCannon = function (degrees) {
            if (degrees >= 63) {
                degrees = 63;
            }
            if (degrees <= -63) {
                degrees = -63;
            }


            $(".shooter").css({
                "transform": "translateX(-50%) rotate(" + degrees + "deg)"
            });
        }

        var rotateBubble = function (x, y, angle) {
            if (angle >= 63) {
                x = 700;
                y = 900;
            }
            if (angle <= -63) {
                x = 200;
                y = 900;
            }


            $('.currentBubble:last').css({
                "transform": "translateX(" + x + "px) translateY(" + y + "px)"
            });

        }

        var popBubbles = function (bubbles, delay) {
            $.each(bubbles, function () {
                var bubble = this;
                setTimeout(function () {
                    bubble.setState(BubbleShoot.BubbleState.POPPING);
                    bubble.animatePop();
                    setTimeout(function () {
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
            $.each(bubbles, function () {
                var bubble = this;
                board.popBubbleAt(bubble.getRow(), bubble.getColumn());
                setTimeout(function () {
                    bubble.setState(BubbleShoot.BubbleState.FALLING);
                    bubble.getSprite().kaboom({
                        callback: function () {
                            bubble.getSprite.remove();
                            bubble.setState(BubbleShoot.BubbleState.FALLEN);
                        }
                    });
                }, delay);
            });
        };

        var endGame = function (hasWon) {
            if (hasWon) {
                level++;
            }
            $(".playButton").click('click', startGame);
            $("#board .bubble").remove();
            BubbleShoot.ui.endGame(hasWon, score);
            score = 0;
            level = 0;
        };

    };
    return Game;
})(jQuery);