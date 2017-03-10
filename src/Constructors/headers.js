function HeaderText(cWidth, fontSize, colors, label, val) {
    "use strict";

    this.cWidth = cWidth;
    this.fontSize = fontSize;
    this.colors = colors;
    this.label = label;
    this.val = val || 0;

    this.font = `${this.fontSize}px monospace`;
    this.padding = fontSize;
    this.y = this.padding + this.fontSize;
}

HeaderText.prototype.draw = function(ctx) {

    ctx.font = this.font;
    ctx.textAlign = this.align || "start";
    ctx.fillStyle = this.colors.normal;
    ctx.fillText(this.msg, this.x, this.y);
};

function Left(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize, colors, label, val);

    // specific props
    this.align = "left";
    this.x = this.padding;
    this.msg = `${this.label}: ${this.val}`;
}

Left.prototype = Object.create(HeaderText.prototype);

function Right(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize, colors, label, val);

    // specific props
    this.align = "right";
    this.x = cWidth - this.padding;
    this.msg = `${this.label}: ${this.val}`;
}

Right.prototype = Object.create(HeaderText.prototype);

function Center(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize * 1.5, colors, label, val);

    this.align = "center";
    this.x = cWidth / 2;
    this.msg = `x${this.val}`;
}

Center.prototype = Object.create(HeaderText.prototype);

exports.Left = Left;
exports.Right = Right;
exports.Center = Center;
