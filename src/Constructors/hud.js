var canvas      = require("../canvas");

var posUnit = Math.floor(canvas.width / 16),
    padding = 8,
    fontSize = 24;

function TopLeft(label, color) {
    "use strict";

    this.fontSize = fontSize;
    this.y = padding + this.fontSize;
    this.xL = posUnit * 2;
    this.xR = posUnit * 5;

    this.label = label;
    this.color = color;
    this.font = `${this.fontSize}px monospace`;
}

TopLeft.prototype.draw = function(ctx, val) {

    ctx.save();

    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = "left";
    ctx.fillText(this.label, this.xL, this.y);
    ctx.textAlign = "right";
    ctx.fillText(val, this.xR, this.y);

    ctx.restore();
};

function TopRight(label, color) {
    "use strict";

    TopLeft.call(this, label, color);

    this.xL = canvas.width - posUnit * 5;
    this.xR = canvas.width - posUnit * 2;
}

TopRight.prototype = Object.create(TopLeft.prototype);

function TopMid(label, color) {
    "use strict";

    this.fontSizeLarge = fontSize * 2;
    this.fontSizeSmall = fontSize / 2;
    this.yLarge = padding + this.fontSizeLarge;
    this.ySmall = padding + this.fontSizeSmall;
    this.x = canvas.width / 2;

    this.label = label;
    this.color = color;
    this.fontLarge = `${this.fontSizeLarge}px monospace`;
    this.fontSmall = `${this.fontSizeSmall}px monospace`;
}

TopMid.prototype.draw = function(ctx, val) {

    ctx.save();

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    //ctx.font = this.fontSmall;
    //ctx.fillText(this.label, this.x, this.ySmall);
    ctx.font = this.fontLarge;
    ctx.fillText(val, this.x, this.yLarge);

    ctx.restore();
};

function BRCorner() {
    "use strict";

    this.color = "white";

    // Pellets
    this.fontSizeP = fontSize;
    this.fontP = `${this.fontSizeP}px monospace`;
    this.xP = canvas.width - fontSize - fontSize;
    this.yP = canvas.height - fontSize;

    // Pellet
    this.pColor = "gold";
    this.x = this.xP + 4;
    this.y = this.yP - 16;
    this.w = 16;

    // Multiplier
    this.fontSizeM = fontSize * 2;
    this.fontM = `${this.fontSizeM}px monospace`;
    this.xM = canvas.width - fontSize;
    this.yM = canvas.height - fontSize - this.fontSizeP;
}

BRCorner.prototype.draw = function(ctx, multiplier, playerP, sceneP) {
    
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.textAlign = "right";
    ctx.font = this.fontM;
    ctx.fillText("x" + multiplier, this.xM, this.yM);
    ctx.font = this.fontP;
    ctx.fillText(playerP + " / " + sceneP, this.xP, this.yP);

    ctx.fillStyle = this.pColor;
    ctx.fillRect(this.x, this.y, this.w, this.w);

    ctx.restore();
};

exports.TopLeft = TopLeft;
exports.TopRight = TopRight;
exports.TopMid = TopMid;
exports.BRCorner = BRCorner;
