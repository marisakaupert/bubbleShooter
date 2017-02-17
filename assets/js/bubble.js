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
        this.getRow = function () {
            return row;
        };
    };
    Bubble.create = function (rowNumber, columnNumber, type) {
        if (type == undefined) {
            type = Math.floor(Math.random() * 4);
        };
        var sprite = $(document.createElement("div"));
        sprite.addClass("bubble");
        sprite.addClass("bubble" + type);
        var bubble = new Bubble(rowNumber, columnNumber, type, sprite);
        return bubble;
    };
    return Bubble;
})(jQuery);