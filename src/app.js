var Background = require("./background");
var Player = require("./player");

var app = {

    assets: [

        background: {},
        actors: [],
        messages: []
    ]
};

app.init = function(canvas) {
    "use strict";

    this.assets.background = new Background(canvas, "green");
    this.assets.actors[0] = new Player(canvas);
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    this.assets.background.draw(canvas.ctx);

    // Static Player
    this.assets.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Do nothing
};

module.exports = app;
