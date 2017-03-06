//var Background = require("../src/background");
//var canvas = require("../src/canvas");

var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

var mainMenu = {

    gameTitle: "squares",

    selections: [
        "new game",
        "leaderboards",
        "exit"
    ],

    cursor: {},

    actors: []
};

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var text = mainMenu.gameTitle,
    blockSize = 64,
    titleWidth,
    textWidth,
    textX, textY;

ctx.font = "100px monospace";
textWidth = Math.floor(ctx.measureText(text).width);
console.log(textWidth);
titleWidth = textWidth + 128;

textX = canvas.width / 2 - (titleWidth / 2) + 128;
textY = canvas.height / 2 - blockSize;

ctx.fillStyle = "white";
ctx.fillText(text, textX, textY);

ctx.fillRect(textX - 68, textY - 46, 48, 48);

ctx.fillStyle = "gold";
ctx.fillRect(textX - 68, textY - 46 - 36, 24, 24);
ctx.fillRect(textX - 68 - 60, textY - 46, 24, 24);

// menu
var menuY = canvas.height / 2 + 64,
    menuFontSize = 42;

ctx.fillStyle = "white";
ctx.font = menuFontSize + "px monospace";

mainMenu.selections.forEach((selection, i) => {
    ctx.fillText(selection, textX + 4, menuY + menuFontSize * 1.2 * i);
});

// Cursor
ctx.fillStyle = "gold";
ctx.fillRect(textX - 16 - 24, menuY - 24, 24, 24);
