var Menu = require("./menu.js");

var mainMenu = new Menu(42);

mainMenu.colors = {
    background: "black",
    mainTitle: "white",
    selections: "white",
    cursor: "gold"
};

mainMenu.selections = [
    "new game",
    "leaderboards",
    "exit"
];

// TODO make a separate file for the main title and import it
mainMenu.mainTitle = {

    gameTitle: "squares",
    titleFontSize: 100,

    init: function(ctx) {
        "use strict";

        ctx.font = this.titleFontSize + "px monospace";
        this.textWidth = Math.floor(ctx.measureText(this.gameTitle).width);
    }
};

mainMenu.draw = function(ctx) {
    
};

module.exports = mainMenu;
