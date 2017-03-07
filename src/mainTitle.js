module.exports = {

    text: "squares",
    textX: 0,
    textY: 0,
    textW: 0,
    font: "100px monospace",

    colors: {
        primary: "white",
        secondary: "gold"
    },

    init: function(canvas) {

        var ctx = canvas.ctx;

        ctx.font = this.font;
        this.textW = Math.floor(ctx.measureText(this.text).width);
        this.titleWidth = textW + 128;

        this.textX = canvas.width / 2 - titleWidth / 2 + 128; // REVIEW
        this.textY = canvas.height / 2 - 64;
    },

    draw: function(ctx) {

        // Main title
        ctx.fillStyle = this.colors.primary;
        ctx.font = this.font;
        ctx.fillText(this.text, this.textX, this.textY);

        // Large square
        ctx.fillRect(textX - 68, textY - 46, 48, 48);

        // Small squares
        ctx.fillStyle = this.colors.secondary;
        ctx.fillRect(textX - 68, textY - 82, 24, 24);
        ctx.fillRect(textX - 128, textY - 46, 24, 24);
    }
};
