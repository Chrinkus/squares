function HeaderText(cWidth, fontSize, colors, label, val) {
    "use strict";

    this.cWidth = cWidth;
    this.fontSize = fontSize;
    this.colors = colors;
    this.label = label;
    this.val = val || 0;

    this.font = `${this.fontSize}px monospace`;
    this.padding = fontSize / 2;
    this.y = this.fontSize;

    this.toTenths = function(val) {
        var inTenths = Math.round(val * 10) / 10;
        return inTenths % 1 !== 0 ? inTenths : inTenths + ".0";
    };
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
}

Left.prototype = Object.create(HeaderText.prototype);

Object.defineProperties(Left.prototype, {

    "valTenths": {

        get: function() {

            if (this.val < 0) {
                return "0.0";
            } else {
                return this.toTenths(this.val);
            }
        }
    },

    "msg": {

        get: function() {

            function output(str, label, valTenths) {
                return label + str[1] + valTenths;
            }
            return output`${this.label}: ${this.valTenths}`;
        }
    }
});

Left.prototype.update = function(delta) {

    // Specific to use as a timer
    this.val -= delta / 1000;
};

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
