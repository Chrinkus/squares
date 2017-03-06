var Background = require("./background");
var Cursor = require("./cursor");

function Menu(fontSize) {
    "use strict";

    // arg defined
    this.fontSize = fontSize;
    this.font = fontSize + "px monospace";
    this.lineHeight = Math.floor(fontSize * 1.2);

    // explicitly defined
    this.colors = null;
    this.selections = null;

    // defined in this.init(canvas)
    this.background = null;
    this.player = null;

    // contains selections & associated actions
    this.actors = [];
}

Menu.prototype.init = function(canvas) {

    this.background = new Background(canvas, this.colors.background);

    this.player = new Cursor(this);

    if (this.mainTitle) {
        mainTitle.init(canvas.ctx);
    }
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "new game":
            // Launch new game at level 1
            break;

        case "leaderboards":
            // Display local leaderboards
            break;

        case "exit":
            // Close window &/or return to previous page
            break;

        case "level select":
            // Choose a level to start at
            break;

        case "controls":
            // Display a list of the game controls
            break;

        case "credits":
            // List my name a bunch of times
            break;

        default:
            // Do nothing
    }
};

module.exports = Menu;
