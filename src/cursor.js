var moveCursor = require("./input").moveCursor;

function Cursor(menu) {
    "use strict";
    this.menu = menu;

    this.x = menu.cursorData.x;
    this.y = menu.cursorData.y;
    this.w = menu.cursorData.w;
    this.color = menu.colors.cursor;
    
    this.i = 0;
    this.iMin = 0;
    this.iMax = menu.selections.length - 1;
    this.offSet = menu.lineHeight;

    this.path = function(y) {
        var path = new Path2D();
        path.rect(this.x, y, this.w, this.w);
        return path;
    };

    this.select = function() {
        menu.select(this.i);
    };
}

Cursor.prototype.draw = function(ctx) {
    
    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.y + this.i * this.offSet));
};

Cursor.prototype.update = function(keysDown) {

    moveCursor(this, keysDown);
};

module.exports = Cursor;
