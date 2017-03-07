var keysDown    = require("./input").keysDown;
var mainMenu    = require("./mainMenu");
var level1      = require("./level1");

var app = {
    mainMenu: mainMenu,
    scenario: null
};

app.sceneLoader = function(i) {
    "use strict";

    var scenes = [
        level1
    ];

    this.scenario = scenes[i];
    this.scenario.init();       // TODO needs canvas!!
};

app.init = function(canvas) {
    "use strict";

    this.keysDown = keysDown();
    this.mainMenu.init(canvas, this.sceneLoader);
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
