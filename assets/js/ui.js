var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.ui = (function ($) {
    var ui = {
        BUBBLE_DIMENSIONS: 44,
        ROW_HEIGHT: 40,
        init: function () {},
        hideDialog: function () {
            $(".dialog").fadeOut(300);
            $("#page").css("background-color", "rgba(205, 21, 63, 0.0)");
        },
        getMouseCoordinates: function (e) {
            var coordinates = {
                x: e.pageX,
                y: e.pageY
            };
            return coordinates;
        },
        getBubbleCoordinates: function (bubble) {
            var bubbleCoordinates = bubble.position();
            bubbleCoordinates.left += ui.BUBBLE_DIMENSIONS / 2;
            bubbleCoordinates.top += ui.BUBBLE_DIMENSIONS / 2;
            return bubbleCoordinates;
        },
        getBubbleAngle: function (bubble, e) {
            var mouseCoordinates = ui.getMouseCoordinates(e);
            var bubbleCoordinates = ui.getBubbleCoordinates(bubble);
            var gameCoordinates = $("#game").position();
            var boardLeft = 120;
            var angle = Math.atan((mouseCoordinates.x - bubbleCoordinates.left - boardLeft) / (bubbleCoordinates.top + gameCoordinates.top - mouseCoordinates.y));
            if (mouseCoordinates.y > bubbleCoordinates.top + gameCoordinates.top) {
                angle += Math.PI;
            }
            return angle;
        },
        fireBubble: function (bubble, coordinates, duration) {
            bubble.getSprite().animate({
                left: coordinates.x - ui.BUBBLE_DIMENSIONS / 2,
                top: coordinates.y - ui.BUBBLE_DIMENSIONS / 2
            }, {
                duration: duration,
                easing: "linear"
            });
        },
        drawboard: function(board){
            var rows = board.getRows();
            var gameArea = $("#board");
            for (var i =0; i < rows.length; i++){
                var rows = rows[i];
                for(var j=0; j <row.length;j++){
                    var bubble = row[j];
                    if(bubble){
                        var sprite = bubble.getSprite();
                        gameArea.append(sprite);
                        var left = j * ui.BUBBLE_DIMENSIONS/2;
                        var top - * ui.ROW_HEIGHT;
                        sprite.css({
                            left: left,
                            top: top
                        });
                    };
                };
            };
        };
    };
    return ui;
})(jQuery);

var testGame = new BubbleShoot.Game();
testGame.init();