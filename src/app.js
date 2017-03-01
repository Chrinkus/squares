var Player = require("./player");
var level1 = require("./level1");

var app = {

    player: null,
    scenario: null
};

app.init = function(canvas) {
    "use strict";

    this.inputs.init();

    this.scenario = level1;
    this.scenario.bgInit(canvas);
    this.scenario.planReader();

    this.player = new Player(canvas, this.scenario.blockSize);
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
    this.scenario.background.draw(canvas.ctx);

    // Player
    this.player.draw(canvas.ctx);

    this.scenario.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice
    this.player.update(this.inputs.keysDown);

    /*this.assets.actors.forEach((actor) => {
        actor.update(this.inputs.keysDown);
    });
    */
};

module.exports = app;
