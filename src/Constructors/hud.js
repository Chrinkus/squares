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

    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = "left";
    ctx.fillText(this.label, this.xL, this.y);
    ctx.textAlign = "right";
    ctx.fillText(val, this.xR, this.y);
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

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    //ctx.font = this.fontSmall;
    //ctx.fillText(this.label, this.x, this.ySmall);
    ctx.font = this.fontLarge;
    ctx.fillText(val, this.x, this.yLarge);
};

exports.TopLeft = TopLeft;
exports.TopRight = TopRight;
exports.TopMid = TopMid;
