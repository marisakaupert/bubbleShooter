var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
    var Game = function () {
        var currentBubble;
        var board;
        this.init = function () {
            $(".playButton").bind('click', startGame);
        };
        var startGame = function () {
            $(".playButton").unbind('click');
            BubbleShoot.ui.hideDialog();
            currentBubble = getNextBubble();
            board = new BubbleShoot.Board();
            BubbleShoot.ui.drawBoard(board);
            $("#game").bind('click',clickGameScreen);
        };
        var getNextBubble = function(){
            var bubble = BubbleShoot.Bubble.create();
            bubble.getSprite().addClass("currentBubble");
            $("#board").append(bubble.getSprite());
            return bubble;
        };
        var clickGameScreen = function(e){
            var angle = BubbleShoot.ui.getBubbleAngle(currentBubble.getSprite(),e);
            var duration = 750;
            var distance = 2000;
            var distanceX = Math.sin(angle) * distance;
            var distanceY = Math.cos(angle) * distance;
            var bubbleCoordinates = BubbleShoot.ui.getBubbleCoordinates(currentBubble.getSprite());
            var coordinates = {
                x: bubbleCoordinates.left + distanceX,
                y: bubbleCoordinates.top = distanceY
            };
            BubbleShoot.ui.fireBubble(currentBubble,coordinates,duration);
        };
    };
    return Game;
})(jQuery);

