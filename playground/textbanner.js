// Banner
//
// Banners will be used similarly to DBM alerts, as instructional queues to the
// player. Colour will be tricky as banners will not have control over their
// backgrounds.

function TextBanner(msg, color, shadow) {
    "use strict";

    this.msg = msg.toUpperCase();
    this.color = color;
    this.shadow = shadow || false;

    this.cX = Math.floor(canvas.width / 2);
    this.x = 0;
    this.y = Math.floor(canvas.height * 0.382);

    this.msgWidth = 0;
    this.fontHeight = Math.floor(canvas.height / 8);
    this.font = this.fontHeight + "px sans-serif";
}

TextBanner.prototype.draw = function() {

    ctx.font = this.font;

    if (this.msgWidth === 0) {

        this.msgWidth = Math.floor(ctx.measureText(this.msg).width);
        this.x = Math.floor(this.cX - this.msgWidth / 2);

    }

    if (this.shadow) {

        // just testing, not default values
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";

    }

    ctx.fillStyle = this.color;
    ctx.fillText(this.msg, this.x, this.y);
};

// Temp for testing
var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

var message = "Get bannered!!";
var banner = new TextBanner(message, "white", true);

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "indigo";
ctx.fillRect(0, 0, canvas.width, canvas.height);

banner.draw();
