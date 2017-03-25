var canvas          = require("./canvas");
var keysDown        = require("./input").keysDown;
var mainMenu        = require("./mainMenu");
var Player          = require("./Constructors/player");
var Confirmation    = require("./Constructors/confirmation");
var scoreTracker    = require("./scoretracker");
var overlay         = require("./overlay");
var timer           = require("./timer");
var level1          = require("./Levels/level1");
var level2          = require("./Levels/level2");
var level3          = require("./Levels/level3");
var level4          = require("./Levels/level4");

var app = {

    player: null,
    scenario: null,
    currentScene: 0,
    scenes: [
        level1,
        level2,
        level3,
        level4
    ],

    state: ""
};

app.sceneLoader = function(i) {
    "use strict";

    if (!this.scenes[i]) {
        return this.init();
    }

    this.scenario = this.scenes[i];
    this.currentScene = i;
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

    scoreTracker.getDefaultScores(this.scenes);

    mainMenu.init((i) => {
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

            overlay.draw(scoreTracker, this.player.pellets,
                    this.scenario.pellets);
            break;

        case "complete":
            this.scenario.draw(canvas.ctx);
            scoreTracker.draw(this.scenario.colors.wall);
            this.confirmation.draw();

        default:
            // no default
    }
};

app.update = function(tStamp) {
    "use strict";
    timer.progress(tStamp);

    switch (this.state) {
        case "mainmenu":
            mainMenu.update(this.keysDown, timer.delta);
            break;

        case "game":
            this.player.update(this.keysDown, this.scenario.actors,
                    scoreTracker);
            scoreTracker.timeUpdate(timer.delta);
            if (this.player.pellets === this.scenario.pellets) {
                this.state = "complete";
                scoreTracker.tabulate();

                this.confirmation = new Confirmation(() => {
                    delete this.confirmation;
                    scoreTracker.reset();
                    this.sceneLoader(this.currentScene + 1);
                }, " to continue ");
            }
            break;

        case "complete":
            this.confirmation.update(this.keysDown, timer.delta);

        default:
            // no default
    }
};

module.exports = app;
