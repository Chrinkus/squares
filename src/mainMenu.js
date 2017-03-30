var Menu        = require("./Constructors/menu");
var mainTitle   = require("./mainTitle");

var font = 42,
    colors = {
        background: "black",
        selections: "white",
        cursor: "gold"
    },
    selections = [
        "new game",
        "leaderboard",
        "controls",
        "credits"
    ],
    mainMenu = null;

mainMenu = new Menu(font, colors, selections, mainTitle);

module.exports = mainMenu;
