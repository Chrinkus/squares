var Background = require("./background");
var Player = require("./player");

var app = {

    assets: {

        background: null,
        player: null,
        actors: [],
        messages: []
    }
};

app.init = function(canvas) {
    "use strict";

    var blockSize = 32;         // temp data: will acquire from scene

    this.inputs.init();

    this.assets.background = new Background(canvas, "green");
    this.assets.player = new Player(canvas, blockSize);
};

app.inputs = {

    keysDown: {},

    init: function () {
        "use strict";

        document.addEventListener("keydown", function (e) {
            this.keysDown[e.keyCode] = true;
        }.bind(this), false);

        document.addEventListener("keyup", function (e) {
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

    // Player
    this.assets.player.draw(canvas.ctx);

    /* Draw other assets
    this.assets.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
    */
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice
    this.assets.player.update(this.inputs.keysDown);

    /*this.assets.actors.forEach((actor) => {
        actor.update(this.inputs.keysDown);
    });
    */
};

module.exports = app;
