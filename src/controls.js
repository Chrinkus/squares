var canvas          = require("./canvas");
var Confirmation    = require("./confirmation");

var controls = {

    color: "white",
    headerFont: "48px monospace",
    fieldFont: "32px monospace",

    headY: canvas.height / 2 - 200,
    headX: canvas.width / 2,
    moveY: canvas.height / 2 - 150,
    moveXL: canvas.width / 2 - 200,
    moveXR: canvas.width / 2 + 200,

    moveFields: [
        ["Arrows", "Hot Keys"],
        ["Up", "W"],
        ["Left", "A"],
        ["Down", "S"],
        ["Right", "D"]
    ]
};

controls.draw = function() {
    "use strict";

    ctx.save();

    ctx.fillStyle = this.color;
    ctx.font = this.headerFont;
    ctx.textAlign = "center";
    ctx.fillText("Movement", headX, topY);
    ctx.font = this.fieldFont;

    this.moveFields.forEach((field, i) => {
        ctx.textAlign = "left";
        ctx.fillText(field[0], this.moveXL, this.moveY + i * 40);
        ctx.textAlign = "right";
        ctx.fillText(field[1], this.moveXR, this.moveY + i * 40);
    });

    ctx.restore();
};
