var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.CollisionDetector = (function ($) {
    var CollisionDetector = {
        findIntersection: function (currentBubble, board, angle) {
            var rows = board.getRows();
            var collision = null;
            var pos = currentBubble.getSprite().position();
            var start = {
                left: pos.left + BubbleShoot.ui.BUBBLE_DIMENSIONS / 2,
                top: pos.top + BubbleShoot.ui.BUBBLE_DIMENSIONS / 2
            };
            var dX = Math.sin(angle);
            var dY = -Math.cos(angle);
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                for (var j = 0; j < row.length; j++) {
                    var bubble = row[j];
                    if (bubble) {
                        var coordinates = bubble.getCoordinates();
                        var distanceToBubble = {
                            x: start.left - coordinates.left,
                            y: start.top - coordinates.top
                        };
                        var t = dX * distanceToBubble.x + dY * distanceToBubble.y;
                        var eX = -t * dX + start.left;
                        var eY = -t * dY + start.top;
                        var distanceEC = Math.sqrt((eX - coordinates.left) * (eX - coordinates.left) + (eY - coordinates.top) * (eY - coordinates.top));
                        if (distanceEC < BubbleShoot.ui.BUBBLE_DIMENSIONS * 0.75){
                            var dT = Math.sqrt(BubbleShoot.ui.BUBBLE_DIMENSIONS * BubbleShoot.ui.BUBBLE_DIMENSIONS - distanceEC * distanceEC);
                            var offset1 = {
                                x : (t-dT) * dX,
                                y: -(t-dT)*dY
                            };
                            var offset2 = {
                                x : (t+dT)*dX,
                                y: -(t + dT) * dY
                            };
                            var distanceToCollision1 = Math.sqrt(offset1.x * offset1.x + offset1.y *offset1.y);
                            var distanceToCollision2 = Math.sqrt(offset2.x * offset2.x + offset2.y *offset2.y);
                            if (distanceToCollision1 < distanceToCollision2){
                                var distanceToCollision = distanceToCollision1;
                                var destination = {
                                    x: offset1.x + start.left,
                                    y: offset1.y + start.top
                                };
                            }else {
                                var distanceToCollision = distanceToCollision2;
                                var destination = {
                                    x: -offset2.x + start.left,
                                    y: offset2.y + start.top
                                };
                            }
                            if(!collision || collision.distanceToCollision > distanceToCollision){
                                collision = {
                                    bubble: bubble,
                                    distanceToCollision : distanceToCollision,
                                    coordinates : destination
                                };
                            };
                        };
                    };
                };
            };
            return collision;
        }
    };
    return CollisionDetector;
})(jQuery);