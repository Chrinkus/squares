var Player      = require("./player");
var Block       = require("../Path2D/block");
var Coin        = require("../Path2D/coin");
var Pellet      = require("../Path2D/pellet");
var Background  = require("./background");

function Scene() {
    "use strict";

    // explicitly defined in level files
    this.blockSize = 0;
    this.plan = [];
    this.colors = null;

    // defined in this.init(canvas)
    this.background = null;
    this.player = null;

    // defined in this.planReader()
    this.actors = [];
    this.playerLocation = null;
}

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

                case "$":
                    this.actors.push(new Coin(x, y, this.colors.coin,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    break;

                case "@":
                    if (!this.playerLocation) {

                        this.playerLocation = {
                            x: x,
                            y: y
                        };
                    }
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.init = function(canvas) {

    this.background = new Background(canvas, this.colors.background);

    this.player = new Player(canvas, this.colors.player, this.blockSize);

    if (this.playerLocation) {
        this.player.x = this.playerLocation.x;
        this.player.y = this.playerLocation.y;
    }
};

module.exports = Scene;
