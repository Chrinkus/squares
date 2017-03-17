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
    this.sceneLoaderHook = null;

    // REVIEW need better solution 
    this.cursorData = {
        x: 0,
        y: 0,
        w: fontSize
    };

    // display toggle
    this.active = false;
}

Menu.prototype.init = function(canvas, sceneLoaderHook) {

    // main app hook
    this.sceneLoaderHook = sceneLoaderHook;

    // center menu by default
    this.menuX = canvas.width / 2;
    this.menuY = canvas.height / 2 + this.lineHeight;

    this.cursorData.x = this.menuX;
    this.cursorData.y = this.menuY - this.cursorData.w;

    this.background = new Background(canvas, this.colors.background);

    if (this.mainTitle) {
        this.mainTitle.init(canvas);

        // menu adjusments
        this.menuX = this.mainTitle.textX;
        this.cursorData.x = this.menuX - 40;
    }

    this.cursor = new Cursor(this);

};

Menu.prototype.draw = function(ctx) {

    this.background.draw(ctx);

    ctx.fillStyle = this.colors.selections;
    ctx.font = this.font;
    
    this.selections.forEach((selection, i) => {
        ctx.fillText(selection, this.menuX, this.menuY + this.lineHeight * i);
    });

    if (this.mainTitle) {
        this.mainTitle.draw(ctx);
    }

    this.cursor.draw(ctx);
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "level 1":
            // Launch new game at level 1
            this.sceneLoaderHook(i);
            break;

        case "level 2":
            // Display local leaderboards
            this.sceneLoaderHook(i);
            break;

        case "level select":
            // Choose a level to start at
            console.log("level select selected");
            break;

        case "controls":
            // Display a list of the game controls
            console.log("controls selected");
            break;

        default:
            // Do nothing
    }
};

module.exports = Menu;
