var canvas      = require("../canvas");

function Confirmation(f, msg) {
    "use strict";

    this.f = f;
    this.msg = msg || " ";

    this.x = canvas.width / 2;
    this.y = canvas.height - 48;
    this.font = "24px monospace";
    this.alpha = 1;
    this.fadeOut = true;
    this.counter = 0;
    this.display = `( Press SPACEBAR${this.msg})`;
}

Confirmation.prototype.draw = function() {

    var ctx = canvas.ctx;

    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(this.display, this.x, this.y);
    ctx.restore();
};

Confirmation.prototype.update = function(keysDown) {

    if (32 in keysDown) {
        delete keysDown[32];
        return this.f();
    }

    if (this.counter > 2) {
        
        if (this.fadeOut) {
            this.alpha -= 0.05;
        } else {
            this.alpha += 0.05;
        }

        this.counter = 0;
    } else {
        this.counter += 1;
    }

    if (this.alpha <= 0) {

        this.alpha = 0;
        this.fadeOut = false;

    } else if (this.alpha >= 1) {

        this.alpha = 1;
        this.fadeOut = true;
    }
};

module.exports = Confirmation;
