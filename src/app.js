var canvas          = require("./canvas");
var keysDown        = require("./input").keysDown;
var mainMenu        = require("./menu/mainMenu");
var Player          = require("./player");
var Confirmation    = require("./confirmation");
var scoreTracker    = require("./scoretracker");
var overlay         = require("./overlay");
var timer           = require("./timer");
var Camera          = require("./camera");
var level1          = require("./levels/level1");
var level2          = require("./levels/level2");
var level3          = require("./levels/level3");
var level4          = require("./levels/level4");
var level5          = require("./levels/level5");
var audio           = require("./Audio/audio");

var app = {

    keysDown: keysDown(),
    player: null,
    scenario: null,
    currentScene: 0,
    scenes: [
        level1,
        level2,
        level3,
        level4,
        level5
    ],

    camera: null,
    state: ""
};

app.sceneLoader = function(i) {
    "use strict";

    audio.progress(i);

    if (!this.scenes[i]) {
        return this.init();
    }

    this.scenario = this.scenes[i];
    this.currentScene = i;
    this.scenario.init();
    this.camera = new Camera(this.scenario.mapW, this.scenario.mapH);

    scoreTracker.timeRemaining = this.scenario.timer;
    scoreTracker.setHiScore(this.scenario.name);

    this.player = new Player(this.scenario.playerData, audio.pickup);

    if (this.player.x === 0) {
        this.player.x = canvas.width / 2 - this.player.w / 2;
        this.player.y = canvas.height / 2 - this.player.w / 2;
    }

    this.state = "game";
};

app.init = function() {
    "use strict";

    audio.init();
    scoreTracker.getHiScores(this.scenes);

    mainMenu.init((i) => {
        this.sceneLoader(i);
    }, scoreTracker.hiScores, audio.pickup);

    this.state = "mainmenu";
};

app.render = function() {
    "use strict";

    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (this.state) {
        case "mainmenu":
            mainMenu.draw(canvas.ctx);
            break;

        case "game":
            canvas.ctx.save();
            canvas.ctx.translate(-this.camera.camX, -this.camera.camY);

            this.scenario.draw(canvas.ctx);
            this.player.draw(canvas.ctx);

            canvas.ctx.restore();

            overlay.draw(scoreTracker, this.player.pellets,
                    this.scenario.pellets);
            break;

        case "complete":
            this.scenario.draw(canvas.ctx);
            overlay.draw(scoreTracker, this.player.pellets,
                    this.scenario.pellets);
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
            this.camera.update(this.player.xC, this.player.yC);

            audio.queueAhead();
            scoreTracker.timeUpdate(timer.delta);
            if (this.player.pellets === this.scenario.pellets) {
                this.state = "complete";
                scoreTracker.tabulate(this.scenario.name);

                this.confirmation = new Confirmation(() => {
                    delete this.confirmation;
                    scoreTracker.reset();
                    this.sceneLoader(this.currentScene + 1);
                }, " to continue ", audio.pickup);
            }
            break;

        case "complete":
            audio.queueAhead();
            this.confirmation.update(this.keysDown, timer.delta);

        default:
            // no default
    }
};

module.exports = app;
