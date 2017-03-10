var HFieldLeft      = require("./HFieldLeft");
var HFieldRight     = require("./HFieldRight");
var HFieldCenter    = require("./HFieldCenter");

function HeaderBar(fontSize, headers, colors) {
    "use strict";

    this.fontSize = fontSize;
    this.headers = headers;

    this.fields = [];

    this.x = 0;
    this.y = 0;

    // defined in this.init()
    this.xMax = 0;
    this.yMax = 0;
}

Object.defineProperty(HeaderBar.prototype, {

    fieldWidth: {

        get: function() {
            return Math.floor(this.xMax / 3);
        }
    }
});

HeaderBar.prototype.init = function(canvas) {

    this.xMax = canvas.width;
    this.yMax = canvas.height;
};

HeaderBar.prototype.draw = function(ctx) {

    // draw text
    this.fields.forEach((field) => {
        field.draw(ctx);
    });
};

// Other module:

function HFieldLeft(header, txt, val) {
    "use strict";

    // args
    this.header = header;
    this.txt = txt;
    this.val = val || 0;

    this.msg = `${this.txt}: ${this.val}`;

    // styling
    this.align = "left";
    this fontSize = header.fontSize;
    this.font = this.fontSize + "px monospace";
    this.color = header.colors.fields;

    // location
    this.padding = this.fontSize / 2;
    this.x = header.x + this.padding;
    this.y = header.y + this.padding + this.fontSize;
}

HFieldLeft.prototype.draw = function(ctx) {

    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.fillText(this.msg, this.x, this.y);
};
