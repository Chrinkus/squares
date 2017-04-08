var canvas      = require("./canvas");
var fadeInOut   = require("./fadeinout");
var Kick        = require("./Audio/kick");

function Confirmation(f, msg, soundEffect) {
    "use strict";

    this.f = f;
    this.msg = msg || " ";

    this.x = canvas.width / 2;
    this.y = canvas.height - 48;
    this.font = "24px monospace";
    this.alpha = 1;
    this.display = `( Press SPACEBAR${this.msg})`;
    this.soundEffect = soundEffect;
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
        this.soundEffect.play();
        return this.f();
    }

    this.alpha = fadeInOut(this.alpha);
};

module.exports = Confirmation;
