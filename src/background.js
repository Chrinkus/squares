function Background(width, height, color) {
    "use strict";

    this.xMax = width;
    this.yMax = height;
    this.color = color;
}

Background.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.xMax, this.yMax);
};

module.exports = Background;
