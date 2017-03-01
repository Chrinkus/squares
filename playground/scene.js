var Block = require("../Path2D/block");
var Coin = require("../Path2D/coin");
var Pellet = require("../Path2D/pellet");
var Background = require("../src/background");

function Scene() {
    "use strict";

    this.blockSize = 0;
    this.plan = [];
    this.colors = null;

    this.background = null;
    this.actors = [];
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

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.bgInit = function(canvas) {

    this.background = new Background(canvas, this.colors.background);
};

module.exports = Scene;
