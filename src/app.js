var keysDown    = require("./input").keysDown;
var mainMenu    = require("./mainMenu");
var timer       = require("./timer");
var level1      = require("./Levels/level1");
var level2      = require("./Levels/level2");

var app = {
    mainMenu: mainMenu,
    timer: timer,
    state: "",          // game, mainmenu, pause

    scenario: null,
    scenes: [
        level1,
        level2
    ]
};

app.sceneLoader = function(canvas, i) {
    "use strict";

    this.scenario = this.scenes[i];
    this.scenario.init(canvas);

    this.state = "game";
};

app.init = function(canvas) {
    "use strict";

    this.keysDown = keysDown();
    this.mainMenu.init(canvas, (i) => {
        this.sceneLoader(canvas, i);
    });
    this.state = "mainmenu";
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (this.state) {
        case "mainmenu":
            this.mainMenu.draw(canvas.ctx);
            break;

        case "game":
            this.scenario.draw(canvas.ctx);
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
            this.scenario.update(this.keysDown, this.timer.delta);
            break;

        default:
            // no default
    }
};

module.exports = app;
