var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("./background");

function Scene(blockSize) {
    "use strict";

    // explicitly defined in level files
    this.blockSize = blockSize;
    this.plan = [];
    this.colors = null;
    this.timer = 0;

    // defined in this.init(canvas)
    this.background = null;

    // defined in this.planReader()
    this.actors = [];
    this.playerData = {
        x: 0,
        y: 0,
        b: blockSize,
        w: blockSize * 2
    };
}

Object.defineProperties(Scene.prototype, {

    "mapW": {
        get: () => {
            delete this.mapW;
            this.mapW = this.plan[0].length * this.blockSize;
        }
    },

    "mapH": {
        get: () => {
            delete this.mapH;
            this.mapH = this.plan.length * this.blockSize;
        }
    }
});

Scene.prototype.draw = function(ctx) {

    var msg;

    this.background.draw(ctx);

    this.actors.forEach((actor) => {
        
        if (!actor.statusCode) {
            return;
        }

        actor.draw(ctx);
    });
};

Scene.prototype.update = function(delta) {

    // Does nothing so far...
};

Scene.prototype.planReader = function() {

    this.plan.forEach((row, i) => {

        row.split("").forEach((character, j) => {

            var x = j * this.blockSize,
                y = i * this.blockSize;

            switch (character) {
                case "#":
                    this.actors.push(new Block(x, y, this.colors.wall,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    break;

                case "@":
                    this.playerData.x = x;
                    this.playerData.y = y;
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.init = function(canvas) {

    this.background = new Background(canvas, this.colors.background);
};

module.exports = Scene;
