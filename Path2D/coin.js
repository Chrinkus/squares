function Coin(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.r = blockSize / 2;
    this.x = x + this.r;
    this.y = y + this.r;
    this.color = color;

    this.collision = "soft";
    this.statusCode = 1;

    this.path = (function() {
        var path = new Path2D();
        path.arc(that.x, that.y, that.r, 0, Math.PI * 2);
        return path;
    }());
}

Coin.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Coin;
