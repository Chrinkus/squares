var collision       = require("./collision");
var move8           = require("./input").move8;

function Player(playerData) {
    "use strict";

    this.x = playerData.x;
    this.y = playerData.y;
    this.w = playerData.w;
    this.b = playerData.b;
    this.minW = playerData.b / 2;
    this.maxW = playerData.b * 3;
    this.d = playerData.b / 8;
    this.color = playerData.color;

    this.pellets = 0;

    this.path = function(x, y) {
        var path = new Path2D();

        path.rect(x, y, this.w, this.w);
        return path;
    };
}

Object.defineProperties(Player.prototype, {

    "xC": {
        get: function() {
            return this.x + this.w / 2;
        }
    },

    "yC": {
        get: function() {
            return this.y + this.w / 2;
        }
    }
});

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.shrink = function() {

    this.x += 4;
    this.y += 4;
    this.w -= 8;
};

Player.prototype.grow = function() {

    this.x -= 2;
    this.y -= 2;
    this.w += 4;
};

Player.prototype.update = function(keysDown, actors, scoreTracker) {

    // Process move
    var snapshot = {
        x: this.x,
        y: this.y
    };

    move8(this, keysDown);

    //Check collision
    actors.forEach((actor) => {
        
        if (actor.statusCode === 0) {
            return;
        }

        if (collision(this, actor)) {

            if (actor.collision === "soft") {

                actor.statusCode = 0;

                scoreTracker.scoreInc(100);
                this.pellets += 1;

                if (this.w < this.maxW) {
                    this.grow();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }

            if (actor.collision === "hard") {

                this.x = snapshot.x;
                this.y = snapshot.y;

                if (this.w > this.minW) {
                    this.shrink();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }
        }
    });
};

module.exports = Player;
