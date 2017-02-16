var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function ($) {
    var Game = function () {};
    rhis.init = function () {
        $(".playButton").bind('click', startGame);
    };
    var startGame = function () {
        $(".playButton").unbind('click');
        BubbleShoot.ui.hideDialog();
    };
};
return Game;
})(jQuery);