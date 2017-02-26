function Player(canvas) {
    "use strict";

    var block = 64;

    this.x = canvas.width / 2 - block / 2;
    this.y = canvas.height / 2 - block / 2;
    this.color = "white";

    this.path = function(x, y) {
        
        var path = new Path2D();
        path.rect(x, y, block, block);
        return path;
    };
}

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

module.exports = Player;
