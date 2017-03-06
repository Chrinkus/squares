var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

var CW = canvas.width;
var CH = canvas.height;

var cols = CW / 64;
var rows = CH / 64;

function Square(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.w = 64;
    this.max = true;

    this.path = function(x, y, w) {
        var path = new Path2D();
        path.rect(x, y, w, w);
        return path;
    };
}

Square.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fill(this.path(this.x, this.y, this.w));
};

Square.prototype.shrink = function() {
    this.x += 2;
    this.y += 2;
    this.w -= 4;
};

Square.prototype.grow = function() {
    this.x -= 2;
    this.y -= 2;
    this.w += 4;
};

Square.prototype.update = function() {
    if (this.max) {

        if (this.w > 48) {
            this.shrink();
        } else {
            this.max = false;
        }
    } else {

        if (this.w < 64) {
            this.grow();
        } else {
            this.max = true;
        }
    }
};

var squares = [],
    i, j;

for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
        squares.push(new Square(j * 64, i * 64));
    }
}

var frameCounter = 1;
var msg = "squares";
ctx.font = "72px monospace";
var textW = Math.floor(ctx.measureText(msg).width);
var textX = CW - 64 - textW;
var textY = 256;

function main() {
    window.requestAnimationFrame(main);

    ctx.clearRect(0, 0, CW, CH);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CW, CH);

    squares.forEach((squ) => {
        squ.draw(ctx);
    });

    ctx.fillStyle = "black";
    ctx.fillText(msg, textX, textY);

    if (frameCounter === 0) {
        squares.forEach((squ) => {
            squ.update();
        });
    }

    frameCounter = (frameCounter + 1) % 8;
}

main();
