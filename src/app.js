var Player = require("./player");
var keysDown = require("./input").keysDown;
var level1 = require("./level1");

var app = {

    player: null,
    scenario: null
};

app.init = function(canvas) {
    "use strict";

    this.keysDown = keysDown();

    this.scenario = level1;
    this.scenario.bgInit(canvas);
    this.scenario.planReader();

    this.player = new Player(canvas, this.scenario.colors.player,
            this.scenario.blockSize);
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    this.scenario.background.draw(canvas.ctx);

    // Player
    this.player.draw(canvas.ctx);

    this.scenario.actors.forEach((actor) => {

        if (!actor.statusCode) {
            return;
        }

        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice
    this.player.update(this.keysDown, this.scenario.actors);
};

module.exports = app;
