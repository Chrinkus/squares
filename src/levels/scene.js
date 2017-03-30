var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("../background");

function Scene(blockSize, name, plan, colors) {
    "use strict";

    this.blockSize = blockSize;
    this.name = name;
    this.plan = plan;
    this.colors = colors;
    this.mapW = plan[0].length * blockSize;
    this.mapH = plan.length * blockSize;

    // explicitly defined in level files
    this.timer = 0;
    this.defaultScore = 0;

    // defined in this.init(canvas)
    this.background = null;

    // defined in this.planReader()
    this.actors = [];
    this.pellets = 0;
    this.playerData = {
        x: 0,
        y: 0,
        b: blockSize,
        w: blockSize * 2
    };
}

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

Scene.prototype.planReader = function() {

    this.pellets = 0;

    this.plan.forEach((row, i) => {

        row.split("").forEach((character, j) => {

            var x = j * this.blockSize,
                y = i * this.blockSize;

            switch (character) {
                case "#":
                    this.actors.push(new Block(x, y, this.colors.wall,
                                this.blockSize));
                    break;

                case "W":
                    this.actors.push(new Block(x, y, this.colors.water,
                                this.blockSize));
                    break;

                case "L":
                    this.actors.push(new Block(x, y, this.colors.leaves,
                                this.blockSize));
                    break;

                case "C":
                    this.actors.push(new Block(x, y, this.colors.castle,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    this.pellets += 1;
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

Scene.prototype.init = function() {

    this.background = new Background(this.mapW, this.mapH,
            this.colors.background);
    this.planReader();
};

module.exports = Scene;
