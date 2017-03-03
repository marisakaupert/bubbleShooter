var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Board = (function($) {
            var NUM_ROWS = 3;
            var NUM_COLUMNS = 3;
            var Board = function() {
                var that = this;
                this.isEmpty = function(){
                  return this.getBubbles().length == 0;
                };
                var rows = createLayout();
                this.getRows = function () {
                    return rows;
                };
                this.getBubbles = function(){
                  var bubbles = [];
                  var rows = this.getRows();
                  for (var i = 0; i < rows.length; i++){
                    var row = rows[i];
                    for(var j=0; j < rows.length;j++){
                      var bubble = row[j];
                      if(bubble){
                        bubbles.push(bubble);
                      };
                    };
                  };
                  return bubbles;
                }
                this.addBubble = function (bubble, coordinates) {
                    var rowNumber = Math.floor(coordinates.y / BubbleShoot.ui.ROW_HEIGHT);
                    var columnNumber = coordinates.x / BubbleShoot.ui.BUBBLE_DIMENSIONS * 2;
                    if (rowNumber % 2 == 1) {
                        columnNumber -= 1;
                    }
                    columnNumber = Math.round(columnNumber / 2) * 2;
                    if (rowNumber % 2 == 0) {
                        columnNumber -= 1;
                    }
                    if (!rows[rowNumber]) {
                        rows[rowNumber] = [];
                    }
                    rows[rowNumber][columnNumber] = bubble;
                    bubble.setRow(rowNumber);
                    bubble.setColumn(columnNumber);
                };
                this.getBubbleAt = function(rowNumber, columnNumber) {
                    if (!this.getRows()[rowNumber]) {
                        return null;
                    }
                    return this.getRows()[rowNumber][columnNumber];
                };
                this.getBubblesAround = function (currentRow, currentColumn) {
                    var bubbles = [];
                    for (var rowNumber = currentRow - 1; rowNumber <= currentRow + 1; rowNumber++) {
                        for (var columnNumber = currentColumn - 2; columnNumber <= currentColumn + 2; columnNumber++) {
                            var bubbleAt = that.getBubbleAt(rowNumber, columnNumber);
                            if (bubbleAt && !(columnNumber == currentColumn && rowNumber == currentRow)) {
                                bubbles.push(bubbleAt);
                            }
                        };
                    };
                    return bubbles;
                };
                this.getGroup = function(bubble,found,differentColor){
                    var currentRow = bubble.getRow();
                    if(!found[currentRow]) {
                        found[currentRow] = {};
                    }
                    if(!found.list) {
                        found.list = [];
                    }
                    if(found[currentRow][bubble.getColumn()]){
                        return found;
                    }
                    found[currentRow][bubble.getColumn()] = bubble;
                    found.list.push(bubble);
                    var currentColumn = bubble.getColumn();
                    var surrounding = that.getBubblesAround(currentRow,currentColumn);
                    for(var i=0;i<surrounding.length;i++){
                        var bubbleAt = surrounding[i];
                        if(bubbleAt.getType() == bubble.getType() || differentColor){
                            found = that.getGroup(bubbleAt,found,differentColor);
                        };
                    };
                    return found;
                }
                this.popBubbleAt = function(rowNumber,columnNumber){
                    var row = rows[rowNumber];
                    delete row[columnNumber];
                };
                this.findOrphans = function(){
                    var connected = [];
                    var groups = [];
                    var rows = that.getRows();
                    for(var i = 0;i<rows.length;i++){
                        connected[i] = [];
                    };
                    for (var i=0;i<rows[0].length;i++){
                        var bubble = that.getBubbleAt(0,i);
                        if(bubble && !connected[0][i]){
                            var group = that.getGroup(bubble,{},true);
                            $.each(group.list,function(){
                                connected[this.getRow()][this.getColumn()] = true;
                            });
                        };
                    };
                    var orphaned = [];
                    for(var i=0;i<rows.length;i++){
                        for(var j=0;j<rows[i].length;j++){
                            var bubble = that.getBubbleAt(i,j);
                            if(bubble && !connected[i][j]){
                                orphaned.push(bubble);
                            };
                        };
                    };
                    return orphaned;
                };
                return this;
            };

                var createLayout = function () {
                    var rows = [];
                    for (var i = 0; i < NUM_ROWS; i++) {
                        var row = [];
                        var startColumn = i % 2 == 0 ? 1 : 0;
                        for (var j = startColumn; j < NUM_COLUMNS; j += 2) {
                            var bubble = BubbleShoot.Bubble.create(i, j);
                            bubble.setState(BubbleShoot.BubbleState.ON_BOARD);
                            row[j] = bubble;
                        };
                        rows.push(row);
                    };
                    return rows;
                };
                return Board;
            })(jQuery);
