var keysDown    = require("./input").keysDown;
var mainMenu    = require("./mainMenu");
var level1      = require("./Levels/level1");

var app = {
    mainMenu: mainMenu,
    scenario: null,
    scenes: [
        level1
    ]
};

app.sceneLoader = function(canvas, i) {
    "use strict";

    if (i) {
        this.scenario = this.scenes[i];
    } else {
        this.scenario = this.scenes[0];
    }

    this.scenario.init(canvas);
    this.mainMenu.active = false;
};

app.init = function(canvas) {
    "use strict";
    var that = this;

    function play(i) {
        that.sceneLoader(canvas, i);
    }

    this.keysDown = keysDown();
    this.mainMenu.init(canvas, play);
    this.mainMenu.active = true;
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.mainMenu.active) {
        mainMenu.draw(canvas.ctx);
        return;
    }

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

    if (this.mainMenu.active) {
        this.mainMenu.cursor.update(this.keysDown);
        return;
    }
    
    this.scenario.player.update(this.keysDown, this.scenario.actors);
};

module.exports = app;
