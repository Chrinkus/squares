var canvas          = require("../canvas");

function Page(pageTitle, pageFields, columnStyle, fieldFontSize) {
    "use strict";
    var xC = canvas.width / 2,
        yC = canvas.height / 2;

    this.pageTitle = pageTitle;
    this.pageFields = pageFields;
    this.leftColumnAlign = columnStyle === "spread" ? "left" : columnStyle;
    this.rightColumnAlign = columnStyle === "spread" ? "right" : columnStyle;

    this.textColor = "white";
    this.headerFontSize = 48;
    this.headerFont = this.headerFontSize + "px monospace";
    this.headerLineHeight = Math.floor(this.headerFontSize * 1.2);
    this.fieldFontSize = fieldFontSize || 32;
    this.fieldFont = this.fieldFontSize + "px monospace";
    this.fieldLineHeight = Math.floor(this.fieldFontSize * 1.2);
    this.textAreaWidth = columnStyle === "spread" ? 400 : 300;
    this.textAreaHeight = this.headerLineHeight + this.fieldLineHeight *
            this.pageFields.length;
    
    // Positions text slightly above middle
    this.headY = yC - this.textAreaHeight / 2;
    this.headX = xC;
    this.fieldY = yC - this.textAreaHeight / 2 + this.headerLineHeight; 
    this.fieldXL = xC - this.textAreaWidth / 2;
    this.fieldXR = xC + this.textAreaWidth / 2;
}

Page.prototype.draw = function() {

    var ctx = canvas.ctx;

    ctx.save();

    ctx.fillStyle = this.textColor;
    ctx.font = this.headerFont;
    ctx.textAlign = "center";
    ctx.fillText(this.pageTitle, this.headX, this.headY);
    ctx.font = this.fieldFont;

    this.pageFields.forEach((field, i) => {
        var y = this.fieldY + i * this.fieldLineHeight;

        ctx.textAlign = this.leftColumnAlign;
        ctx.fillText(field[0], this.fieldXL, y);

        ctx.textAlign = this.rightColumnAlign;
        ctx.fillText(field[1], this.fieldXR, y);
    });

    ctx.restore();
};

module.exports = Page;
