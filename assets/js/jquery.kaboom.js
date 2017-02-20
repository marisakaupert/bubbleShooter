(function(jQuery){
    var defaults = {
        gravity: 1.3,
        maxY : 800
    };
    var toMove = [];
    jQuery.fn.kaboom = function(settings){
        var config = $.extend({}, defaults, settings);
        if(toMove.length == 0){
            setTimeout(moveAll,40);
        };
        var dX = Math.round(Math.random() * 10) - 5;
        var dY = Math.round(Math.random() * 5) + 5;
        toMove.push({
          element : $(this),
          dX : dX,
          dY : dY,
          x : $(this).position().left,
          y : $(this).position().top,
          config : config
        });
    };
    var moveAll = function(){
      var frameProportion = 1;
      var stillToMove = [];
      for (var i = 0; i < toMove.length;i++){
        var obj = toMove[i];
        obj.x += obj.dX * frameProportion;
        obj.y -= obj.dY * frameProportion;
        obj.dY -= obj.config.gravity * frameProportion;
        if (obj.y < obj.config.maxY){
          obj.element.css({
            top : Math.round(obj.y),
            left : Math.round(obj.x)
          });
          stillToMove.push(obj);
        } else if (obj.config.callBack){
          obj.config.callBack();
        }
      };
      toMove = stillToMove;
      if(toMove.length > 0){
        setTimeout(moveAll,40);
      }
    };
})(jQuery);
