var Background  = require("./background");
var Cursor      = require("./cursor");

function Menu(fontSize) {
    "use strict";

    // arg defined
    this.fontSize = fontSize;
    this.font = fontSize + "px monospace";
    this.lineHeight = Math.floor(fontSize * 1.2);

    // explicitly defined
    this.colors = null;
    this.selections = null;
    this.mainTitle = null;

    // defined in this.init(canvas)
    this.background = null;
    this.cursor = null;
    this.menuX = 0;
    this.menuY = 0;
    this.sceneLoader = null;        // Expected function
}

Menu.prototype.init = function(canvas, sceneLoader) {

    // main app hook
    this.sceneLoader = sceneLoader;

    this.background = new Background(canvas, this.colors.background);

    this.cursor = new Cursor(this);

    if (this.mainTitle) {
        this.mainTitle.init(canvas);
        this.menuX = mainTitle.textX;
    }

    this.menuY = canvas.height / 2 - this.lineHeight;

    if (!this.menuX) {
        this.menuX = canvas.width / 2;  // Not used in main menu
    }
};

Menu.prototype.draw = function(ctx) {

    ctx.fillStyle = this.colors.selections;
    ctx.font = this.font;
    
    this.selections.forEach((selection, i) => {
        ctx.fillText(selection, this.menuX, this.menuY + this.lineHeight * i);
    };

    if (this.mainTitle) {
        this.mainTitle.draw(ctx);
    }
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "new game":
            // Launch new game at level 1
            this.sceneLoader(0);
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
