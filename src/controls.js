var canvas          = require("./canvas");

var controls = {

    color: "white",
    headerFontSize: 48,
    headerLineHeight: Math.floor(48 * 1.2),
    fieldFontSize: 32,
    fieldLineHeight: Math.floor(32 * 1.2),

    header: "Movement",
    moveFields: [
        ["Arrows", "Hot Keys"],
        ["======", "========"],
        ["Up", "W"],
        ["Left", "A"],
        ["Down", "S"],
        ["Right", "D"]
    ],

    get textAreaHeight() {
        delete this.textAreaHeight;
        this.textAreaHeight = this.headerLineHeight + this.fieldLineHeight *
                this.moveFields.length;
    },

    get positionProps() {
        var xC = canvas.width / 2,
            yC = canvas.height / 2;

        this.headY = yC - this.textAreaHeight / 2 + this.headerFontSize;
        this.headX = xC;
        this.moveY = yC - this.textAreaHeight / 2 + this.headerLineHeight +
            this.fieldLineHeight;
        this.moveXL = xC - 150;
        this.moveXR = xC + 150;
    }
};

controls.draw = function() {
    "use strict";
    var ctx = canvas.ctx;

    if (!this.headY) {
        this.positionProps;
    }

    ctx.save();

    ctx.fillStyle = this.color;
    ctx.font = this.headerFontSize + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Movement", this.headX, this.headY);
    ctx.font = this.fieldFontSize + "px monospace";

    this.moveFields.forEach((field, i) => {
        var y = this.moveY + i * 40;

        ctx.fillText(field[0], this.moveXL, y);
        ctx.fillText(field[1], this.moveXR, y);
    });

    ctx.restore();
};

module.exports = controls;
