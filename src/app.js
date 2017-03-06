var keysDown = require("./input").keysDown;
var level1 = require("./level1");

var app = {};

app.init = function(canvas) {
    "use strict";

    this.keysDown = keysDown();
    // TODO init main menu w/main title here. pass it sceneLoader

    // split out to a scenario loader
    this.scenario = level1;
    this.scenario.init(canvas);
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    this.scenario.background.draw(canvas.ctx);

    // Player
    this.scenario.player.draw(canvas.ctx);

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
    this.scenario.player.update(this.keysDown, this.scenario.actors);
};

module.exports = app;
