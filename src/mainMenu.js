var Menu        = require("./menu.js");
var mainTitle   = require("./mainTitle");

var mainMenu = new Menu(42);

mainMenu.colors = {
    background: "black",
    selections: "white",
    cursor: "gold"
};

mainMenu.selections = [
    "new game",
    "leaderboards",
    "exit"
];

mainMenu.mainTitle = mainTitle;

module.exports = mainMenu;
