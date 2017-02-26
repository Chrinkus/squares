var Background = require("./background");
var Player = require("./player");

var app = {

    assets: {

        background: null,
        actors: [],
        messages: []
    }
};

app.init = function(canvas) {
    "use strict";

    this.inputs.init();

    this.assets.background = new Background(canvas, "green");
    this.assets.actors[0] = new Player(canvas);
};

app.inputs = {

    keysDown: {},

    init: function () {
        "use strict";

        window.addEventListener("keydown", function (e) {
            this.keysDown[e.keyCode] = true;
        }.bind(this), false);

        window.addEventListener("keyup", function (e) {
            delete this.keysDown[e.keyCode];
        }.bind(this), false);
    }
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    this.assets.background.draw(canvas.ctx);

    // Static Player
    this.assets.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice

    this.assets.actors.forEach((actor) => {
        actor.update(this.inputs.keysDown);
    });
};

module.exports = app;
