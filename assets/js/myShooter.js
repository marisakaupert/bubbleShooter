//Get the tile coordinate
function getTileCoordinate(column, row) {
    var tileX = column * tileWidth;

    //X Offset for odd rows
    if ((row + rowOffset) % 2) {
        tileX += tileWidth / 2;
    }

    var tileY = row * rowHeight;
    return {
        tileX: tileX,
        tileY: tileY
    };
}


//Render Tiles
function renderTiles() {
    //Top to bottom
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < columns; i++) {
            //Get the tile
            var tile = tileArray[i][j];

            //Calculate the coordinates
            var coordinates = getTileCoordinate(i, j);

            //Draw the tile
            drawTile(coordinates.tileX, coordinates.tileY, tile.type);
        }
    }
}

//Get the closest grid position
function getGridPosition(x, y) {
    var gridY = Math.floor(y / rowHeight);

    //Check for offset
    var offsetX = 0;
    if ((gridY + rowOffset) % 2) {
        offsetX = tileWidth / 2;
    }

    var gridX = Math.floor((x - offsetX) / tileWidth);

    return {
        x: gridX,
        y: gridY
    };
}

//Convert radians to degrees
function radiansToDegrees(angle) {
    return angle * (180 / Math.PI)
}

//On mouse movement
function onMouseMove(e) {
    //Get the mouse position
    var position = getMousePosition(canvas, e);

    //Get the mouse angle
    var mouseAngle = radiansToDegrees(Math.atan2((player.y + tileHeight / 2) - position.y, position.x - (player.x + tileWidth / 2)));

    //Convert range to 0, 360 degrees
    if (mouseAngle < 0) {
        mouseAngle = 180 + (180 + mouseAngle);
    }

    var leftBound = 8;
    var upBound = 172;

    if (mouseAngle > 90 && mouseAngle < 270) {
        //Left
        if (mouseAngle > upBound)
            mouseAngle = upBound;
    } else {
        //Right
        if (mouse < leftBound || mouseAngle >= 270) {
            mouseAngle = leftBound;
        }
    }


    //Set the player angle
    player.angle = mouseAngle;
}

//Convert degrees to radians
function degreesToRadians(angle) {
    return angle * (Math.PI / 180);
}

//Render the angle of the mouse
function renderMouseAngle() {
    var centerX = player.x + tileWidth / 2;
    var centerY = player.y + tileHeight / 2;

    //Draw the angle
    context.linewidth = 2;
    context.strokeStyle = "#0000ff";
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + 1.5 * tileWidth * Math.cos(degreesToRadians(player.angle)), centerY - 1.5 * tileHeight * Math.sin(degreesToRadians(player.angle)));
    context.stroke();

}

function stateShootBubble(dt) {
    //Move the bubble in the direction of the mouse
    bubble.x += dt * bubble.speed * Math.cos(degreesToRadians(bubble.angle));
    bubble.y += dt * bubble.speed * -1 * MAth.sin(degreesToRadians(bubble.angle));

}

function snapBubble() {
    //Handle left and right collisions with level
    if (bubble.x <= level.x) {
        //Left edge
        bubble.angle = 180 - bubble.angle;
        bubble.x = level.x;
    } else if (bubble.x + tileWidth >= level.x + level.width) {
        //Right edge
        bubble.angle = 180 - bubble.angle;
        bubble.x = level.x + level.width = tileWidth;
    }

    //Collisions with the top of the level
    if (bubble.y <= level.y) {
        //Top Collision
        bubble.y = level.y;
        snapBubble();
        return;
    }

    //Collisions with other tiles
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            var tile = level.tiles[i][j];

            //Skip the empty tiles
            if (tile.type < 0) {
                continue;
            }


            //Check for intersections
            var coordinate = getTileCoordinate(i, j);
            if (circleIntersection(bubble.x + tileWidth / 2, bubble.y + tileHeight / 2, level.radius, coordinate.tileX + tileWidth / 2, coordinate.tileY + tileHeight / 2, level.radius)) {
                //Intersection with a level bubble
                snapBubble();
                return;
            }

        }
    }
}


//Check if two circle intersect
function circleIntersection(x1, y1, r1, x2, y2, r2) {
    //Calculate the distance between the centers
    var dX = x1 - x2;
    var dY = y1 - y2;
    var length = Math.sqrt(dX * dX + dY * dY);

    if (length < r1 + r2) {
        //Circle intersect
        return true;
    }

    return false;
}
