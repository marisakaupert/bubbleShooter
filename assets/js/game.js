var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
    var Game = function () {
        var currentBubble;
        var board;
        var numberOfBubbles;
        var MAX_BUBBLES = 70;
        this.init = function () {
            $(".playButton").bind('click', startGame);
        };
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
        var popBubbles = function(bubbles, delay) {
            $.each(bubbles,function() {
                var bubble = this;
                setTimeout(function(){
                    bubble.animatePop();
                }, delay);
                board.popBubbleAt(this.getRow(), this.getColumn());
                setTimeout(function(){
                    bubble.getSprite().remove();
                }, delay + 200);
                delay += 60;
            });
        };
    };
    return Game;
})(jQuery);