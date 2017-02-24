var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Bubble = (function ($) {
    var Bubble = function (row, column, type, sprite) {
        var that = this;
        this.getType = function () {
            return type;
        };
        this.getSprite = function () {
            return sprite;
        };
        this.getColumn = function () {
            return column;
        };
        this.setColumn = function (columnIn) {
            column = columnIn;
        };
        this.getRow = function () {
            return row;
        };
        this.setRow = function (rowIn) {
            row = rowIn;
        };
        this.getCoordinates = function () {
            var coordinates = {
                left: that.getColumn() * BubbleShoot.ui.BUBBLE_DIMENSIONS / 2 + BubbleShoot.ui.BUBBLE_DIMENSIONS / 2,
                top: that.getRow() * BubbleShoot.ui.ROW_HEIGHT + BubbleShoot.ui.BUBBLE_DIMENSIONS / 2
            };
            return coordinates;
        }
        this.animatePop = function () {
            var top = type * that.getSprite().height();
            this.getSprite().css("transform", "rotate(" + Math.random() * 360 + ")deg");
            setTimeout(function () {
                that.getSprite().css("background-position", "-100px -" + top + "px");
            }, 125);
            setTimeout(function () {
                that.getSprite().css("background-position", "-200px -" + top + "px");
            }, 150);
            setTimeout(function () {
                that.getSprite().css("background-position", "-300px -" + top + "px");
            }, 175);
            setTimeout(function () {
                that.getSprite().remove();
            }, 200);

        };
    };
    Bubble.create = function (rowNumber, columnNumber, type) {
        if (type == undefined) {
            type = Math.floor(Math.random() * 5);
        };
        var sprite = $(document.createElement("div"));
        sprite.addClass("bubble");
        sprite.addClass("bubble" + type);
        var bubble = new Bubble(rowNumber, columnNumber, type, sprite);
        return bubble;
    };
    return Bubble;
})(jQuery);
