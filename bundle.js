(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Background(canvas, color) {
    "use strict";

    this.xMax = canvas.width;
    this.yMax = canvas.height;
    this.color = color;
}

Background.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.xMax, this.yMax);
};

module.exports = Background;

},{}],2:[function(require,module,exports){
function Block(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.w = blockSize;
    this.x = x;
    this.y = y;
    this.color = color;

    this.collision = "hard";
    this.statusCode = 1;            // status codes to be defined in app.js

    // Static path pattern
    this.path = (function() {
        var path = new Path2D();
        path.rect(that.x, that.y, that.w, that.w);
        return path;
    }());
}

Block.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Block;

},{}],3:[function(require,module,exports){
var canvas      = require("../canvas");

function Confirmation(f, msg) {
    "use strict";

    this.f = f;
    this.msg = msg || " ";

    this.x = canvas.width / 2;
    this.y = canvas.height - 48;
    this.font = "24px monospace";
    this.alpha = 1;
    this.fadeOut = true;
    this.counter = 0;
    this.display = `( Press SPACEBAR${this.msg})`;
}

Confirmation.prototype.draw = function() {

    var ctx = canvas.ctx;

    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(this.display, this.x, this.y);
    ctx.restore();
};

Confirmation.prototype.update = function(keysDown) {

    if (32 in keysDown) {
        delete keysDown[32];
        return this.f();
    }

    if (this.counter > 2) {
        
        if (this.fadeOut) {
            this.alpha -= 0.05;
        } else {
            this.alpha += 0.05;
        }

        this.counter = 0;
    } else {
        this.counter += 1;
    }

    if (this.alpha <= 0) {

        this.alpha = 0;
        this.fadeOut = false;

    } else if (this.alpha >= 1) {

        this.alpha = 1;
        this.fadeOut = true;
    }
};

module.exports = Confirmation;

},{"../canvas":15}],4:[function(require,module,exports){
function Cooldown(ms, f) {
    "use strict";
    
    this.ms = ms;
    this.counter = 0;
    this.callback = f;
}

Cooldown.prototype.increment = function(delta) {

    this.counter += delta;

    if (this.counter > this.ms) {
        this.callback();
    }
};

module.exports = Cooldown;

},{}],5:[function(require,module,exports){
var moveCursor  = require("../input").moveCursor;
var Cooldown    = require("./cooldown");

function Cursor(menu) {
    "use strict";
    this.menu = menu;

    this.x = menu.cursorData.x;
    this.y = menu.cursorData.y;
    this.w = menu.cursorData.w;
    this.color = menu.colors.cursor;
    
    this.i = 0;
    this.iMin = 0;
    this.iMax = menu.selections.length - 1;
    this.offSet = menu.lineHeight;

    this.cooldown = null;

    this.path = function(y) {
        var path = new Path2D();
        path.rect(this.x, y, this.w, this.w);
        return path;
    };
}

Cursor.prototype.draw = function(ctx) {
    
    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.y + this.i * this.offSet));
};

Cursor.prototype.update = function(keysDown, delta) {

    if (this.cooldown) {
        this.cooldown.increment(delta);
        return;
    } else if (moveCursor(this, keysDown)) {
        this.cooldown = new Cooldown(250, () => {
            delete this.cooldown;
        });
    }
    
    // Temporary solution - confirmations usually fire on keyup
    //if (32 in keysDown) {
    //    this.menu.select(this.i);
    //}
};

module.exports = Cursor;

},{"../input":18,"./cooldown":4}],6:[function(require,module,exports){
var canvas      = require("../canvas");

var posUnit = Math.floor(canvas.width / 16),
    padding = 8,
    fontSize = 24;

function TopLeft(label, color) {
    "use strict";

    this.fontSize = fontSize;
    this.y = padding + this.fontSize;
    this.xL = posUnit * 2;
    this.xR = posUnit * 5;

    this.label = label;
    this.color = color;
    this.font = `${this.fontSize}px monospace`;
}

TopLeft.prototype.draw = function(ctx, val) {

    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = "left";
    ctx.fillText(this.label, this.xL, this.y);
    ctx.textAlign = "right";
    ctx.fillText(val, this.xR, this.y);
};

function TopRight(label, color) {
    "use strict";

    TopLeft.call(this, label, color);

    this.xL = canvas.width - posUnit * 5;
    this.xR = canvas.width - posUnit * 2;
}

TopRight.prototype = Object.create(TopLeft.prototype);

function TopMid(label, color) {
    "use strict";

    this.fontSizeLarge = fontSize * 2;
    this.fontSizeSmall = fontSize / 2;
    this.yLarge = padding + this.fontSizeLarge;
    this.ySmall = padding + this.fontSizeSmall;
    this.x = canvas.width / 2;

    this.label = label;
    this.color = color;
    this.fontLarge = `${this.fontSizeLarge}px monospace`;
    this.fontSmall = `${this.fontSizeSmall}px monospace`;
}

TopMid.prototype.draw = function(ctx, val) {

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    //ctx.font = this.fontSmall;
    //ctx.fillText(this.label, this.x, this.ySmall);
    ctx.font = this.fontLarge;
    ctx.fillText(val, this.x, this.yLarge);
};

function BRCorner() {
    "use strict";

    this.color = "white";

    // Pellets
    this.fontSizeP = fontSize;
    this.fontP = `${this.fontSizeP}px monospace`;
    this.xP = canvas.width - fontSize - fontSize;
    this.yP = canvas.height - fontSize;

    // Pellet
    this.pColor = "gold";
    this.x = this.xP + 4;
    this.y = this.yP - 16;
    this.w = 16;

    // Multiplier
    this.fontSizeM = fontSize * 2;
    this.fontM = `${this.fontSizeM}px monospace`;
    this.xM = canvas.width - fontSize;
    this.yM = canvas.height - fontSize - this.fontSizeP;
}

BRCorner.prototype.draw = function(ctx, multiplier, playerP, sceneP) {
    
    ctx.fillStyle = this.color;
    ctx.textAlign = "right";
    ctx.font = this.fontM;
    ctx.fillText("x" + multiplier, this.xM, this.yM);
    ctx.font = this.fontP;
    ctx.fillText(playerP + " / " + sceneP, this.xP, this.yP);

    ctx.fillStyle = this.pColor;
    ctx.fillRect(this.x, this.y, this.w, this.w);
};

exports.TopLeft = TopLeft;
exports.TopRight = TopRight;
exports.TopMid = TopMid;
exports.BRCorner = BRCorner;

},{"../canvas":15}],7:[function(require,module,exports){
var canvas          = require("../canvas");
var Background      = require("./background");
var Cursor          = require("./cursor");
var Confirmation    = require("./confirmation");
var controls        = require("../controls");

function Menu(fontSize, colors, selections, mainTitle) {
    "use strict";

    this.menuState = "mainmenu";
    this.mainTitle = mainTitle || null;
    this.sceneLoaderHook = null;

    // Styling
    this.fontSize = fontSize;
    this.font = fontSize + "px monospace";
    this.lineHeight = Math.floor(fontSize * 1.2);
    this.colors = colors;

    // Positioning: Default
    this.menuX = canvas.width / 2;
    this.menuY = canvas.height / 2 + this.lineHeight;

    // Content
    this.selections = selections;
    this.background = new Background(canvas, this.colors.background);

    this.cursorData = {
        x: this.menuX,
        y: this.menuY - 24,
        w: 24
    };

    if (mainTitle) {
        this.mainTitle.init(canvas);

        // menu adjusments
        this.menuX = this.mainTitle.textX;
        this.cursorData.x = this.menuX - 40;
    }

    this.cursor = new Cursor(this);
}

Menu.prototype.mainConfirm = function() {

    this.confirmation = new Confirmation(() => {
        delete this.confirmation;
        this.select(this.cursor.i);
    }, " to confirm selection ");
};

Menu.prototype.init = function(f) {
    this.sceneLoaderHook = f;
    this.mainConfirm();
};

Menu.prototype.draw = function(ctx) {

    this.background.draw(ctx);

    switch (this.menuState) {
        case "mainmenu":
            ctx.fillStyle = this.colors.selections;
            ctx.font = this.font;
            
            this.selections.forEach((selection, i) => {
                ctx.fillText(selection, this.menuX,
                        this.menuY + this.lineHeight * i);
            });

            if (this.mainTitle) {
                this.mainTitle.draw(ctx);
            }

            this.cursor.draw(ctx);
            break;

        case "controls":
            // controls
            controls.draw();
            break;

        case "leaderboards":
            // leaderboards
            break;

        case "credits":
            // credits
            break;

        default:
            // no default
    }

    if (this.confirmation) {
        this.confirmation.draw();
    }
};

Menu.prototype.update = function(keysDown, delta) {

    if (this.menuState === "mainmenu") {
        this.cursor.update(keysDown, delta);
    }

    if (this.confirmation) {
        this.confirmation.update(keysDown);
    }
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "new game":
            // Launch new game at level 1
            this.sceneLoaderHook(i);
            break;

        case "leaderboards":
            // Display Hi Scores for each level
            console.log("leaderboards selected");
            break;

        case "controls":
            this.menuState = "controls";

            this.confirmation = new Confirmation(() => {
                delete this.confirmation;

                this.menuState = "mainmenu";
                this.mainConfirm();
            }, " to return ");
            break;

        case "credits":
            // Choose a level to start at
            console.log("credits selected");
            break;

        default:
            // Do nothing
    }
};

module.exports = Menu;

},{"../canvas":15,"../controls":17,"./background":1,"./confirmation":3,"./cursor":5}],8:[function(require,module,exports){
function Pellet(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.w = blockSize / 2;
    this.x = x + this.w / 2;
    this.y = y + this.w / 2;
    this.color = color;

    this.collision = "soft";
    this.statusCode = 1;            // status codes to be defined in app.js

    // Static path pattern
    this.path = (function() {
        var path = new Path2D();
        path.rect(that.x, that.y, that.w, that.w);
        return path;
    }());
}

Pellet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Pellet;

},{}],9:[function(require,module,exports){
var collision = require("../collision");
var move8 = require("../input.js").move8;

function Player(playerData) {
    "use strict";

    this.x = playerData.x;
    this.y = playerData.y;
    this.w = playerData.w;
    this.b = playerData.b;
    this.minW = playerData.b / 2;
    this.maxW = playerData.b * 3;
    this.dx = playerData.b / 8;
    this.dy = playerData.b / 8;
    this.color = playerData.color;

    this.pellets = 0;

    this.path = function(x, y) {
        var path = new Path2D();

        path.rect(x, y, this.w, this.w);
        return path;
    };
}

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.shrink = function() {

    this.x += 4;
    this.y += 4;
    this.w -= 8;
};

Player.prototype.grow = function() {

    this.x -= 2;
    this.y -= 2;
    this.w += 4;
};

Player.prototype.update = function(keysDown, actors, scoreTracker) {

    // Process move
    var snapshot = {
        x: this.x,
        y: this.y
    };

    move8(this, keysDown);

    //Check collision
    actors.forEach((actor) => {
        
        if (actor.statusCode === 0) {
            return;
        }

        if (collision(this, actor)) {

            if (actor.collision === "soft") {

                actor.statusCode = 0;

                scoreTracker.scoreInc(100);
                this.pellets += 1;

                if (this.w < this.maxW) {
                    this.grow();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }

            if (actor.collision === "hard") {

                this.x = snapshot.x;
                this.y = snapshot.y;

                if (this.w > this.minW) {
                    this.shrink();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }
        }
    });
};

module.exports = Player;

},{"../collision":16,"../input.js":18}],10:[function(require,module,exports){
var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("./background");

function Scene(blockSize) {
    "use strict";

    // explicitly defined in level files
    this.blockSize = blockSize;
    this.plan = [];
    this.colors = null;
    this.timer = 0;

    // defined in this.init(canvas)
    this.background = null;

    // defined in this.planReader()
    this.actors = [];
    this.pellets = 0;
    this.playerData = {
        x: 0,
        y: 0,
        b: blockSize,
        w: blockSize * 2
    };
}

Object.defineProperties(Scene.prototype, {

    "mapW": {
        get: () => {
            delete this.mapW;
            this.mapW = this.plan[0].length * this.blockSize;
        }
    },

    "mapH": {
        get: () => {
            delete this.mapH;
            this.mapH = this.plan.length * this.blockSize;
        }
    }
});

Scene.prototype.draw = function(ctx) {

    var msg;

    this.background.draw(ctx);

    this.actors.forEach((actor) => {
        
        if (!actor.statusCode) {
            return;
        }

        actor.draw(ctx);
    });
};

Scene.prototype.update = function(delta) {

    // Does nothing so far...
};

Scene.prototype.planReader = function() {

    this.plan.forEach((row, i) => {

        row.split("").forEach((character, j) => {

            var x = j * this.blockSize,
                y = i * this.blockSize;

            switch (character) {
                case "#":
                    this.actors.push(new Block(x, y, this.colors.wall,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    this.pellets += 1;
                    break;

                case "@":
                    this.playerData.x = x;
                    this.playerData.y = y;
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.init = function(canvas) {

    this.background = new Background(canvas, this.colors.background);
};

module.exports = Scene;

},{"./background":1,"./block":2,"./pellet":8}],11:[function(require,module,exports){
var Scene = require("../Constructors/scene");

var level1 = new Scene(32);

level1.plan = [
    "################################",
    "###           ####           ###",
    "##    *   *    ##    *   *    ##",
    "#                              #",
    "#  *                        *  #",
    "#      ###            ###      #",
    "#     ####            ####     #",
    "#  *  ####            ####  *  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  *  ####            ####  *  #",
    "#     ####            ####     #",
    "#      ###            ###      #",
    "#  *                        *  #",
    "#                              #",
    "##    *   *    ##    *   *    ##",
    "###           ####           ###",
    "################################"
];

level1.timer = 20;
level1.hiScore = 2000;      // temp solution

level1.playerData.color = "white";

level1.colors = {
    background: "red",
    wall: "black",
    pellet: "gold"
};

level1.planReader();

module.exports = level1;

},{"../Constructors/scene":10}],12:[function(require,module,exports){
var Scene = require("../Constructors/scene");

var level2 = new Scene(32);

level2.plan = [
    "################################",
    "######                    ######",
    "##        *          *        ##",
    "#                              #",
    "#     *        **   #    *     #",
    "#          #        #          #",
    "#         ##   **   ##         #",
    "###   ######        #####    ###",
    "#         ##   **   ##         #",
    "#          ###    ###          #",
    "#                              #",
    "#     *                  *     #",
    "#                              #",
    "#   #       ##    ##       #   #",
    "#  ##   *   #  @   #   *   ##  #",
    "####        #      #        ####",
    "###         #      #         ###",
    "################################"
];

level2.timer = 20;
level2.hiScore = 2000;      // temp solution

level2.playerData.color = "white";

level2.colors = {
    background: "cornflowerblue",
    wall: "indigo",
    pellet: "gold"
};

level2.planReader();

module.exports = level2;

},{"../Constructors/scene":10}],13:[function(require,module,exports){
var Scene = require("../Constructors/scene");

var level3 = new Scene(16);

level3.plan = [
    "################################################################",
    "#              #           #                                   #",
    "#              #           #      *                     *      #",
    "#    *    *    #           #                                   #",
    "#              #           #                                   #",
    "# *  ######  * #           #     #       #########       #     #",
    "#    #    #    #     #     #     ##       #     #       ##     #",
    "#    # @  #    #  *  #     #     # #       #   #       # #     #",
    "#    #    #    #     #     #     #  #       # #       #  #     #",
    "# *  #    #  * #######     #     #   #       #       #   #     #",
    "#              #     #     #     #    #             #    #     #",
    "#    *    *    #     #     #     #     #           #     #     #",
    "#              #           #     #     #           #     #     #",
    "#              #           #     #    #             #    #     #",
    "#######        #           #     #   #       #       #   #     #",
    "#              #           #     #  #       # #       #  #     #",
    "#         *    #     #     #     # #       #   #       # #     #",
    "#              #     #     #     ##       #     #       ##     #",
    "#              #     #######     #       #########       #     #",
    "#        #######                                               #",
    "#              #                                               #",
    "#    *         #                  *                     *      #",
    "#              #                                               #",
    "#              ###########################################  *  #",
    "#######        #  #  #  #  #  #  #  #  #  #  #           #     #",
    "#              #  #  #     #  #  #     #                 #     #",
    "#         *    #     #     #     #                       #     #",
    "#              #           #                             #     #",
    "#              #                                   #     #     #",
    "#        #######                             #     #     #     #",
    "#                                      #     #     #     #  *  #",
    "#                                #     #     #     #           #",
    "#    *                     #     #     #     #                 #",
    "#                    #  *  #     #  *           *              #",
    "#              #     #     #     #                             #",
    "################################################################"
];

level3.timer = 60;
level3.hiScore = 5000;      // temp solution

level3.playerData.color = "white";

level3.colors = {
    background: "grey",
    wall: "green",
    pellet: "gold"
};

level3.planReader();

module.exports = level3;

},{"../Constructors/scene":10}],14:[function(require,module,exports){
var canvas          = require("./canvas");
var keysDown        = require("./input").keysDown;
var mainMenu        = require("./mainMenu");
var Player          = require("./Constructors/player");
var Hud             = require("./Constructors/hud");
var Confirmation    = require("./Constructors/confirmation");
var scoreTracker    = require("./scoretracker");
var timer           = require("./timer");
var level1          = require("./Levels/level1");
var level2          = require("./Levels/level2");
var level3          = require("./Levels/level3");

var app = {

    hud : {
        score: new Hud.TopLeft("Score", "white"),
        timer: new Hud.TopMid("Time", "white"),
        total: new Hud.TopRight("Hi Score", "white"),
        corner: new Hud.BRCorner()
    },

    player: null,
    scenario: null,
    currentScene: 0,
    scenes: [
        level1,
        level2,
        level3
    ],

    state: ""
};

app.sceneLoader = function(i) {
    "use strict";

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

            this.hud.score.draw(canvas.ctx, scoreTracker.score);
            this.hud.timer.draw(canvas.ctx, scoreTracker.displayTime());
            this.hud.total.draw(canvas.ctx, this.scenario.hiScore);
            this.hud.corner.draw(canvas.ctx, scoreTracker.displayMulti(),
                    this.player.pellets, this.scenario.pellets);
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

},{"./Constructors/confirmation":3,"./Constructors/hud":6,"./Constructors/player":9,"./Levels/level1":11,"./Levels/level2":12,"./Levels/level3":13,"./canvas":15,"./input":18,"./mainMenu":20,"./scoretracker":23,"./timer":24}],15:[function(require,module,exports){
module.exports = (function() {

    var _canvasRef = document.getElementById("viewport");

    return {

        ctx: _canvasRef.getContext("2d"),

        get width() {
            // Lazy getter
            delete this.width;
            return this.width = _canvasRef.width;
        },

        get height() {
            // Lazy getter
            delete this.height;
            return this.height = _canvasRef.height;

        }
    };
}());

},{}],16:[function(require,module,exports){
module.exports = (mov, tar) => {
    "use strict";

    return mov.x < tar.x + tar.w &&
           mov.y < tar.y + tar.w &&
           tar.x < mov.x + mov.w &&
           tar.y < mov.y + mov.w;
};

},{}],17:[function(require,module,exports){
var canvas          = require("./canvas");

var controls = {

    color: "white",
    headerFontSize: 48,
    headerLineHeight: Math.floor(48 * 1.2),
    fieldFontSize: 32,
    fieldLineHeight: Math.floor(32 * 1.2),

    header: "Movement",
    moveFields: [
        ["Arrows", "Hot Keys"],
        ["======", "========"],
        ["Up", "W"],
        ["Left", "A"],
        ["Down", "S"],
        ["Right", "D"]
    ],

    get textAreaHeight() {
        delete this.textAreaHeight;
        this.textAreaHeight = this.headerLineHeight + this.fieldLineHeight *
                this.moveFields.length;
    },

    get positionProps() {
        var xC = canvas.width / 2,
            yC = canvas.height / 2;

        this.headY = yC - this.textAreaHeight / 2 + this.headerFontSize;
        this.headX = xC;
        this.moveY = yC - this.textAreaHeight / 2 + this.headerLineHeight +
            this.fieldLineHeight;
        this.moveXL = xC - 150;
        this.moveXR = xC + 150;
    }
};

controls.draw = function() {
    "use strict";
    var ctx = canvas.ctx;

    if (!this.headY) {
        this.positionProps;
    }

    ctx.save();

    ctx.fillStyle = this.color;
    ctx.font = this.headerFontSize + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Movement", this.headX, this.headY);
    ctx.font = this.fieldFontSize + "px monospace";

    this.moveFields.forEach((field, i) => {
        var y = this.moveY + i * 40;

        ctx.fillText(field[0], this.moveXL, y);
        ctx.fillText(field[1], this.moveXR, y);
    });

    ctx.restore();
};

module.exports = controls;

},{"./canvas":15}],18:[function(require,module,exports){
exports.keysDown = () => {
    "use strict";

    var keysDown = {};

    document.addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    return keysDown; // WORKS!!
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Keyboard Input Legend
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Key          Keycode         Action
// ===          =======         ======
// w            87              Move upwards
// a            65              Move leftwards
// s            83              Move downwards
// d            68              Move rightwards
//
// left arrow   37              Move leftwards
// up arrow     38              Move upwards
// right arrow  39              Move rightwards
// down arrow   40              Move downwards
//
// spacebar     32              Action (context sensitive)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

exports.move8 = (mover, keysDown) => {
    "use strict";

    if (87 in keysDown || 38 in keysDown) {
        mover.y -= mover.dy;
    }
    if (83 in keysDown || 40 in keysDown) {
        mover.y += mover.dy;
    }
    if (65 in keysDown || 37 in keysDown) {
        mover.x -= mover.dx;
    }
    if (68 in keysDown || 39 in keysDown) {
        mover.x += mover.dx;
    }
};

exports.moveCursor = (cursor, keysDown) => {
    "use strict";
    var moved = false;

    if ((87 in keysDown || 38 in keysDown) && (cursor.i > cursor.iMin)) {
        cursor.i -= 1;
        moved = true;
    }
    if ((83 in keysDown || 40 in keysDown) && (cursor.i < cursor.iMax)) {
        cursor.i += 1;
        moved = true;
    }

    return moved;
};

},{}],19:[function(require,module,exports){
var app = require("./app");

(function() {
    "use strict";

    app.init();

    function main(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render();

        app.update(tStamp);
    }

    main();

}());

},{"./app":14}],20:[function(require,module,exports){
var Menu        = require("./Constructors/menu");
var mainTitle   = require("./mainTitle");

var font = 42,
    colors = {
        background: "black",
        selections: "white",
        cursor: "gold"
    },
    selections = [
        "new game",
        "leaderboards",
        "controls"
    ],
    mainMenu = null;

mainMenu = new Menu(font, colors, selections, mainTitle);

module.exports = mainMenu;

},{"./Constructors/menu":7,"./mainTitle":21}],21:[function(require,module,exports){
module.exports = {

    text: "squares",
    textX: 0,
    textY: 0,
    textW: 0,
    font: "100px monospace",

    colors: {
        primary: "white",
        secondary: "gold"
    },

    init: function(canvas) {

        var ctx = canvas.ctx;

        ctx.font = this.font;
        this.textW = Math.floor(ctx.measureText(this.text).width);
        this.titleWidth = this.textW + 128;

        this.textX = canvas.width / 2 - this.titleWidth / 2 + 128;
        this.textY = canvas.height / 2 - 64;
    },

    draw: function(ctx) {

        // Main title
        ctx.fillStyle = this.colors.primary;
        ctx.font = this.font;
        ctx.fillText(this.text, this.textX, this.textY);

        // Large square
        ctx.fillRect(this.textX - 68, this.textY - 46, 48, 48);

        // Small squares
        ctx.fillStyle = this.colors.secondary;
        ctx.fillRect(this.textX - 68, this.textY - 82, 24, 24);
        ctx.fillRect(this.textX - 128, this.textY - 46, 24, 24);
    }
};

},{}],22:[function(require,module,exports){
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// toTenths
//
// @param {Number} val
// @return {String}
//
// Takes a value and converts it to a single decimal place string
// - may be refactored to take a second arg indicating # of decimal places
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.toTenths = (val) => {
    "use strict";
    var inTenths = Math.round(val * 10) / 10;
    
    return inTenths % 1 !== 0 ? inTenths.toString() : inTenths + ".0";
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// spaceFill
//
// @param {Number} val
// @param {Number} digits
// @return {String}
//
// Takes a numerical value and padds it with spaces to # of digits
// - may be refactored to take a third arg indicating what to pad with ex 0's
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.spaceFill = (val, digits) => {
    "use strict";
    var l = val.toString().length,
        spaces = "",
        i, diff;

    if (l < digits) {

        for (i = 0, diff = digits - l; i < diff; i++) {
            spaces += " ";
        }

        return spaces + val;
    } else {
        return val.toString();
    }
};

},{}],23:[function(require,module,exports){
var canvas          = require("./canvas");
var toTenths        = require("./numstring").toTenths;

var scoreTracker = {

    score: 0,
    multiplier: 1,
    timeRemaining: 0,
    timeBonus: 0,
    total: 0,
    grandTotal: 0
};

scoreTracker.timeUpdate = function(delta) {
    "use strict";

    this.timeRemaining -= delta / 1000;
};

scoreTracker.displayTime = function() {
    "use strict";

    if (this.timeRemaining <= 0) {
        return "0.0";
    } else {
        return toTenths(this.timeRemaining);
    }
};

scoreTracker.displayMulti = function() {
    "use strict";

    return toTenths(this.multiplier);
};

scoreTracker.scoreInc = function(n) {
    "use strict";

    this.score += n * this.multiplier;
};

scoreTracker.multiUpdate = function(w, b) {
    "use strict";

    // Every method is universal except this one.
    if (w >= b * 3) {
        this.multiplier = 2;
    } else if (w >= b * 2) {
        this.multiplier = 1.5;
    } else if (w >= b) {
        this.multiplier = 1;
    } else {
        this.multiplier = 0.5;
    }
};

scoreTracker.reset = function() {
    "use strict";

    this.score = 0;
    this.multiplier = 1;
    this.timeRemaining = 0;
    this.timeBonus = 0;
    this.total = 0;
};

scoreTracker.tabulate = function() {
    "use strict";

    // Total up scores
    this.timeRemaining = toTenths(this.timeRemaining);
    this.timeBonus = this.timeRemaining * 25 * this.multiplier;
    this.total = this.score + this.timeBonus;
    this.grandTotal += this.total;

    // Positioning properties
    this.xC = canvas.width / 2;
    this.yC = canvas.height / 2;
    this.rectW = 336;
    this.rectH = 252;
    this.rectX = this.xC - this.rectW / 2;
    this.rectY = this.yC - this.rectH / 2;
    this.tXL = this.xC - 144;
    this.tXR = this.xC + 144;
    this.tYT = this.yC - 84;
    this.lineHeight = 36;

    this.fields = [
        ["Score", this.score],
        ["Time", this.timeRemaining],
        ["Multiplier", toTenths(this.multiplier)],
        ["Time Bonus", toTenths(this.timeBonus)],
        ["Total", this.total],
        ["Grand Total", this.grandTotal]
    ];
};

scoreTracker.draw = function(color) {
    "use strict";

    var ctx = canvas.ctx;

    ctx.fillStyle = color;
    ctx.fillRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.font = "24px monospace";
    ctx.fillStyle = "white";

    this.fields.forEach((field, i) => {
        ctx.textAlign = "left";
        ctx.fillText(field[0], this.tXL, this.tYT + i * this.lineHeight);
        ctx.textAlign = "right";
        ctx.fillText(field[1], this.tXR, this.tYT + i * this.lineHeight);
    });
};

module.exports = scoreTracker;

},{"./canvas":15,"./numstring":22}],24:[function(require,module,exports){
module.exports = {
    previous: 0,
    delta: 0,

    progress: function(tStamp) {
        "use strict";

        if (!this.previous) {
            this.previous = tStamp;
            return;
        }

        this.delta = tStamp - this.previous;
        this.previous = tStamp;
    }
};

},{}]},{},[19]);
