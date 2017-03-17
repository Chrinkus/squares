var Menu        = require("./Constructors/menu");
var mainTitle   = require("./mainTitle");

var mainMenu = new Menu(42);

mainMenu.colors = {
    background: "black",
    selections: "white",
    cursor: "gold"
};

mainMenu.selections = [
    "level 1",
    "level 2",
    "level 3",
    "controls"
];

mainMenu.mainTitle = mainTitle;

mainMenu.cursorData.w = 24;

module.exports = mainMenu;
