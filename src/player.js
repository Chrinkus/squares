function Player(canvas, blockSize) {
    "use strict";

    var _playerSize = blockSize * 2;

    // Initial settings
    this.x = canvas.width / 2 - blockSize;
    this.y = canvas.height / 2 - blockSize;
    this.color = "white";

    // Movement speed
    this.dx = 5;
    this.dy = 5;

    this.path = function(x, y) {
        
        var path = new Path2D();
        path.rect(x, y, _playerSize, _playerSize);
        return path;
    };
}

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.update = function(keysDown) {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Keyboard Input Legend
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Key          Keycode         Action
    // ===          =======         ======
    // w            87              Move upwards
    // a            65              Move leftwards
    // s            83              Move downwards
    // d            68              Move rightwards
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

    // Movement inputs
    if (87 in keysDown) {
        this.y -= this.dy;
    }
    if (83 in keysDown) {
        this.y += this.dy;
    }
    if (65 in keysDown) {
        this.x -= this.dx;
    }
    if (68 in keysDown) {
        this.x += this.dx;
    }
};

module.exports = Player;
