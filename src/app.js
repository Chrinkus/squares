var canvas      = require("./canvas");
var keysDown    = require("./input").keysDown;
var mainMenu    = require("./mainMenu");
var Player      = require("./Constructors/player");
var timer       = require("./timer");
var level1      = require("./Levels/level1");
var level2      = require("./Levels/level2");

var app = {
    mainMenu: mainMenu,
    timer: timer,
    score: 0,
    multiplier: 1,
    state: "",          // game, mainmenu, pause

    player: null,
    scenario: null,
    scenes: [
        level1,
        level2
    ]
};

app.sceneLoader = function(i) {
    "use strict";

    this.scenario = this.scenes[i];
    this.scenario.init(canvas);

    this.player = new Player(this.scenario.playerData, (n) => {
        this.score += n * this.multiplier;
    });

    if (this.player.x === 0) {
        this.player.x = canvas.width / 2 - this.player.w / 2;
        this.player.y = canvas.height / 2 - this.player.w / 2;
    }

    this.state = "game";
};

app.init = function() {
    "use strict";

    this.keysDown = keysDown();
    this.mainMenu.init(canvas, (i) => {
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
            this.mainMenu.draw(canvas.ctx);
            break;

        case "game":
            this.scenario.draw(canvas.ctx);
            this.player.draw(canvas.ctx);
            break;

        default:
            // no default
    }
};

app.update = function(tStamp) {
    "use strict";
    this.timer.progress(tStamp);

    switch (this.state) {
        case "mainmenu":
            this.mainMenu.cursor.update(this.keysDown, this.timer.delta);
            break;

        case "game":
            this.player.update(this.keysDown, this.scenario.actors);
            this.scenario.update(this.keysDown, this.timer.delta);
            break;

        default:
            // no default
    }
};

module.exports = app;
