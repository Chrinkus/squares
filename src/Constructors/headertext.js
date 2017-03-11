var numstring   = require("../numstring");

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

    this.output = function(str, label, val) {

        return label + str[1] + numstring.spaceFill(val, this.digits);
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
    this.digits = 4;
}

Left.prototype = Object.create(HeaderText.prototype);

Object.defineProperties(Left.prototype, {

    "valTenths": {

        get: function() {

            if (this.val < 0) {
                return "0.0";
            } else {
                return numstring.toTenths(this.val);
            }
        }
    },

    "msg": {

        get: function() {

            return this.output`${this.label}: ${this.valTenths}`;
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
    this.digits = 5;
}

Right.prototype = Object.create(HeaderText.prototype);

Object.defineProperty(Right.prototype, "msg", {

    get: function() {

        return this.output`${this.label}: ${this.val}`;
    }
});

Right.prototype.update = function(scoreRef) {

    // Specific to score display
    this.val = scoreRef;
};

function Center(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize * 1.5, colors, label, val);

    this.align = "center";
    this.x = cWidth / 2;
}

Center.prototype = Object.create(HeaderText.prototype);

Object.defineProperty(Center.prototype, "msg", {

    get: function() {

        return `x${numstring.toTenths(this.val)}`;
    }
});

Center.prototype.update = function(multiRef) {

    this.val = multiRef;
};

exports.Left = Left;
exports.Right = Right;
exports.Center = Center;
