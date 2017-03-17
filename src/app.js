var canvas          = require("./canvas");
var keysDown        = require("./input").keysDown;
var mainMenu        = require("./mainMenu");
var Player          = require("./Constructors/player");
var Hud             = require("./Constructors/hud");
var scoreTracker    = require("./scoretracker");
var timer           = require("./timer");
var level1          = require("./Levels/level1");
var level2          = require("./Levels/level2");

var app = {

    hud : {
        score: new Hud.TopLeft("Score", "white"),
        timer: new Hud.TopMid("Time", "white"),
        total: new Hud.TopRight("Hi Score", "white")
    },

    player: null,
    scenario: null,
    scenes: [
        level1,
        level2
    ],

    state: ""
};

app.sceneLoader = function(i) {
    "use strict";

    this.scenario = this.scenes[i];
    this.scenario.init(canvas);

    scoreTracker.timeRemaining = this.scenario.timer;

    this.player = new Player(this.scenario.playerData);

    if (this.player.x === 0) {
        this.player.x = canvas.width / 2 - this.player.w / 2;
        this.player.y = canvas.height / 2 - this.player.w / 2;
    }

    this.state = "game";
};

app.init = function() {
    "use strict";

    this.keysDown = keysDown();
    mainMenu.init(canvas, (i) => {
        this.sceneLoader(i);
    });
    this.state = "mainmenu";
};

app.render = function() {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (this.state) {
        case "mainmenu":
            mainMenu.draw(canvas.ctx);
            break;

        case "game":
            this.scenario.draw(canvas.ctx);
            this.player.draw(canvas.ctx);

            this.hud.score.draw(canvas.ctx, scoreTracker.score);
            this.hud.timer.draw(canvas.ctx, scoreTracker.displayTime());
            this.hud.total.draw(canvas.ctx, this.scenario.hiScore);
            break;

        default:
            // no default
    }
};

app.update = function(tStamp) {
    "use strict";
    timer.progress(tStamp);

    switch (this.state) {
        case "mainmenu":
            mainMenu.cursor.update(this.keysDown, timer.delta);
            break;

        case "game":
            this.player.update(this.keysDown, this.scenario.actors,
                    scoreTracker);
            scoreTracker.timeUpdate(timer.delta);
            break;

        default:
            // no default
    }
};

module.exports = app;
