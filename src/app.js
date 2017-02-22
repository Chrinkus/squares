var app = {};

app.render = function(canvas) {
    "use strict";

    // Easy references
    const ctx = canvas.ctx;
    const CW = canvas.width;
    const CH = canvas.height;

    // Wipe canvas
    ctx.clearRect(0, 0, CW, CH);

    // Background
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, CW, CH);

    // Simple ball
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

app.update = function(tStamp) {
    "use strict";

    // Do nothing
};

module.exports = app;
