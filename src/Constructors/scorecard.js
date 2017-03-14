function ScoreCard(canvas, fontSize) {
    "use strict";

    this.cX = canvas.width / 2;
    this.cY = canvas.height / 2;
    this.fontSize = fontSize;

    this.font = `${this.fontSize}px monospace`;
    this.score = 0;
    this.time = 0;
    this.multiplier = 0;
}

ScoreCard.prototype.fillOut(score, time, multiplier) {

    this.score = score;
    this.time = time;
    this.multiplier = multiplier;
};

ScoreCard.prototype.draw = function(ctx) {

    ctx.font = this.font;
    ctx.fillStyle = this.colors.txt;
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
