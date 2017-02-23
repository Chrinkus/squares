// TextBox constructor
//
// TextBoxes will be loaded into scenes at init but remain unrendered until
// needed. When they are called upon, a status parameter will be set to "true"
// and the box will be displayed.
//
// TextBoxes will consist of 1-3 layers: background, border, and text. Borders
// will be rounded or square.
//
// TextBoxes will be of multiple types as required by the game. Typical boxes
// will be dialogue, pause menu, and instructions.

function TextDialogue(msg, color, rounded) {
    "use strict";

    this.msg = msg;
    this.color = color;
    this.rounded = rounded || false;
    this.setIn = 8;         // pull box off edge of canvas

    // Toggles
    this.border = true;
    this.background = true;

    // Box
    this.x = 0 + this.setIn;
    this.y = Math.floor(canvas.height / 1.618);
    this.w = canvas.width - this.setIn * 2;
    this.h = canvas.height - this.y - this.setIn;

    // Text - the 7 in the next line changes number of lines you can fit
    this.fontHeight = Math.floor(this.h / 7);
    this.padding = Math.floor(this.fontHeight / 2);
    this.font = this.fontHeight + "px sans-serif";
    this.tX = this.x + this.padding;
    this.tY = this.y + this.padding + this.fontHeight;
    this.newline = this.padding + this.fontHeight;

    // Border
    this.bW = this.setIn / 2;
    this.bHalf = this.bW / 2;
    this.bX = this.x + this.bHalf;
    this.bY = this.y + this.bHalf;

    // Paths
    this.bgPath = () => {

        if (this.rounded) {
            
            return roundedRect(this.x, this.y, this.w, this.h, this.setIn);

        } else {

            var path = new Path2D();
            path.rect(this.x, this.y, this.w, this.h);
            return path;
        }
    };

    this.borderPath = () => {

        var x = this.x + this.bHalf,
            y = this.y + this.bHalf,
            w = this.w - this.bW,
            h = this.h - this.bW,
            path;
        
        if (this.rounded) {

            return roundedRect(x, y, w, h, this.setIn);

        } else {

            path = new Path2D();
            path.rect(this.x + this.bHalf, this.y + this.bHalf,
                    this.w - this.bW, this.h - this.bW);
            return path;
        }
    };
}

TextDialogue.prototype.draw = function() {

    // Background
    if (this.background) {
        ctx.fillStyle = this.color;
        ctx.fill(this.bgPath());
    }

    // Border
    if (this.border) {
        ctx.lineWidth = this.bW;
        ctx.strokeStyle = "white";
        ctx.stroke(this.borderPath());
    }

    // Text
    ctx.fillStyle = "white";
    ctx.font = this.font;

    this.msg.forEach((line, i) => {
        var y = this.tY + (i * this.newline);
        ctx.fillText(line, this.tX, y);
    });
};

function roundedRect(x, y, w, h, r) {
	var rr = new Path2D();
	rr.moveTo(x + r, y);
	rr.arcTo(x + w, y, x + w, y + r, r);
	rr.arcTo(x + w, y + h, x + w - r, y + h, r);
	rr.arcTo(x, y + h, x, y + h - r, r);
	rr.arcTo(x, y, x + r, y, r);
	return rr;
}

// Temp for testing
var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

var message = [
    "Its dangerous to go alone, take this!",
    "Sorry Chris, but our context is in another browser.",
    "Wake me when you need me.",
    "There's always a lighthouse, a man, a city."
];

var hello = new TextDialogue(message, "green", false);

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//hello.background = false;
//hello.border = false;

hello.draw();
