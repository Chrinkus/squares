var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("./background");
var HeaderText  = require("./headertext");

function Scene(blockSize) {
    "use strict";

    // explicitly defined in level files
    this.blockSize = blockSize;
    this.plan = [];
    this.colors = null;

    // defined in this.init(canvas)
    this.background = null;
    this.messages = null;

    // defined in this.planReader()
    this.actors = [];
    this.playerData = {
        b: this.blockSize,
        x: 0,
        y: 0,
        w: this.blockSize * 2
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

    for (msg in this.messages) {
        if (this.messages.hasOwnProperty(msg)) {

            this.messages[msg].draw(ctx);
        }
    }
};

Scene.prototype.update = function(delta) {

    //this.messages.headerLeft.update(delta);
    //this.messages.headerRight.update(this.player.score);
    //this.messages.headerCenter.update(this.player.multiplier);
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

    this.messages = {
        headerLeft: new HeaderText.Left(canvas.width, 24, this.colors.txt,
                "Time", 15),
        headerRight: new HeaderText.Right(canvas.width, 24, this.colors.txt,
                "Score", 0),
        headerCenter: new HeaderText.Center(canvas.width, 24, this.colors.txt,
                "Multiplier", 1)
    };
};

module.exports = Scene;
