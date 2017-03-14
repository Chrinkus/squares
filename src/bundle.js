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

},{}],4:[function(require,module,exports){
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
    if (32 in keysDown) {
        this.menu.select(this.i);
    }
};

module.exports = Cursor;

},{"../input":15,"./cooldown":3}],5:[function(require,module,exports){
var numstring   = require("../numstring");

function HeaderText(cWidth, fontSize, colors, label, val) {
    "use strict";

    this.cWidth = cWidth;
    this.fontSize = fontSize;
    this.colors = colors;
    this.label = label;
    this.val = val || 0;

    this.font = `${this.fontSize}px monospace`;
    this.padding = fontSize / 2;
    this.y = this.fontSize;

    this.output = function(str, label, val) {

        return label + str[1] + numstring.spaceFill(val, this.digits);
    };
}

HeaderText.prototype.draw = function(ctx) {

    ctx.font = this.font;
    ctx.textAlign = this.align || "start";
    ctx.fillStyle = this.colors.normal;
    ctx.fillText(this.msg, this.x, this.y);
};

function Left(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize, colors, label, val);

    // specific props
    this.align = "left";
    this.x = this.padding;
    this.digits = 4;
}

Left.prototype = Object.create(HeaderText.prototype);

Object.defineProperties(Left.prototype, {

    "valTenths": {

        get: function() {

            if (this.val < 0) {
                return "0.0";
            } else {
                return numstring.toTenths(this.val);
            }
        }
    },

    "msg": {

        get: function() {

            return this.output`${this.label}: ${this.valTenths}`;
        }
    }
});

Left.prototype.update = function(delta) {

    // Specific to use as a timer
    this.val -= delta / 1000;
};

function Right(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize, colors, label, val);

    // specific props
    this.align = "right";
    this.x = cWidth - this.padding;
    this.digits = 5;
}

Right.prototype = Object.create(HeaderText.prototype);

Object.defineProperty(Right.prototype, "msg", {

    get: function() {

        return this.output`${this.label}: ${this.val}`;
    }
});

Right.prototype.update = function(scoreRef) {

    // Specific to score display
    this.val = scoreRef;
};

function Center(cWidth, fontSize, colors, label, val) {
    "use strict";

    HeaderText.call(this, cWidth, fontSize * 1.5, colors, label, val);

    this.align = "center";
    this.x = cWidth / 2;
}

Center.prototype = Object.create(HeaderText.prototype);

Object.defineProperty(Center.prototype, "msg", {

    get: function() {

        return `x${numstring.toTenths(this.val)}`;
    }
});

Center.prototype.update = function(multiRef) {

    this.val = multiRef;
};

exports.Left = Left;
exports.Right = Right;
exports.Center = Center;

},{"../numstring":19}],6:[function(require,module,exports){
var Background  = require("./background");
var Cursor      = require("./cursor");

function Menu(fontSize) {
    "use strict";

    // arg defined
    this.fontSize = fontSize;
    this.font = fontSize + "px monospace";
    this.lineHeight = Math.floor(fontSize * 1.2);

    // explicitly defined
    this.colors = null;
    this.selections = null;
    this.mainTitle = null;

    // defined in this.init(canvas)
    this.background = null;
    this.cursor = null;
    this.menuX = 0;
    this.menuY = 0;
    this.sceneLoaderHook = null;

    // REVIEW need better solution 
    this.cursorData = {
        x: 0,
        y: 0,
        w: fontSize
    };

    // display toggle
    this.active = false;
}

Menu.prototype.init = function(canvas, sceneLoaderHook) {

    // main app hook
    this.sceneLoaderHook = sceneLoaderHook;

    // center menu by default
    this.menuX = canvas.width / 2;
    this.menuY = canvas.height / 2 + this.lineHeight;

    this.cursorData.x = this.menuX;
    this.cursorData.y = this.menuY - this.cursorData.w + 2;

    this.background = new Background(canvas, this.colors.background);

    if (this.mainTitle) {
        this.mainTitle.init(canvas);

        // menu adjusments
        this.menuX = this.mainTitle.textX;
        this.cursorData.x = this.menuX - 40;
    }

    this.cursor = new Cursor(this);

};

Menu.prototype.draw = function(ctx) {

    this.background.draw(ctx);

    ctx.fillStyle = this.colors.selections;
    ctx.font = this.font;
    
    this.selections.forEach((selection, i) => {
        ctx.fillText(selection, this.menuX, this.menuY + this.lineHeight * i);
    });

    if (this.mainTitle) {
        this.mainTitle.draw(ctx);
    }

    this.cursor.draw(ctx);
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "level 1":
            // Launch new game at level 1
            this.sceneLoaderHook(i);
            break;

        case "level 2":
            // Display local leaderboards
            this.sceneLoaderHook(i);
            break;

        case "level select":
            // Choose a level to start at
            console.log("level select selected");
            break;

        case "controls":
            // Display a list of the game controls
            console.log("controls selected");
            break;

        default:
            // Do nothing
    }
};

module.exports = Menu;

},{"./background":1,"./cursor":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
var collision = require("../collision");
var move8 = require("../input.js").move8;

function Player(canvas, color, blockSize) {
    "use strict";

    this.w = blockSize * 2;
    this.minW = blockSize / 2;
    this.maxW = blockSize * 3;

    // Initial settings
    this.x = canvas.width / 2 - blockSize;
    this.y = canvas.height / 2 - blockSize;
    this.color = color;

    // Movement speed
    this.dx = 4;
    this.dy = 4;

    // Scoring
    this.score = 0;
    this.multiplier = 1;

    this.path = function(x, y) {
        
        var path = new Path2D(),
            halfW = this.w / 2;

        path.rect(x, y, this.w, this.w);
        return path;
    };

    this.shrink = function() {
        this.x += 4;
        this.y += 4;
        this.w -= 8;
    };

    this.grow = function() {
        this.x -= 2;
        this.y -= 2;
        this.w += 4;
    };

    this.multiUpdate = function() {

        if (this.w === 96) {
            this.multiplier = 2;

        } else if (this.w >= 80) {
            this.multiplier = 1.5;

        } else if (this.w >= 64) {
            this.multiplier = 1;

        } else {
            this.multiplier = 0.5;
        }
    };
}

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.update = function(keysDown, entities) {

    // Process move
    var snapshot = {
        x: this.x,
        y: this.y
    };

    move8(this, keysDown);

    //Check collision
    entities.forEach((entity) => {
        
        if (entity.statusCode === 0) {
            return;
        }

        if (collision(this, entity)) {

            if (entity.collision === "soft") {

                entity.statusCode = 0;

                this.score += 100 * this.multiplier;

                if (this.w < this.maxW) {
                    this.grow();
                    this.multiUpdate();
                }
                return;
            }

            if (entity.collision === "hard") {

                this.x = snapshot.x;
                this.y = snapshot.y;

                if (this.w > this.minW) {
                    this.shrink();
                    this.multiUpdate();
                }
                return;
            }
        }
    });
};

module.exports = Player;

},{"../collision":14,"../input.js":15}],9:[function(require,module,exports){
var Player      = require("./player");
var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("./background");
var HeaderText  = require("./headertext");

function Scene() {
    "use strict";

    // explicitly defined in level files
    this.blockSize = 0;
    this.plan = [];
    this.colors = null;

    // defined in this.init(canvas)
    this.background = null;
    this.player = null;
    this.messages = null;

    // defined in this.planReader()
    this.actors = [];
    this.playerLocation = null;
}

Scene.prototype.draw = function(ctx) {

    var msg;

    this.background.draw(ctx);
    this.player.draw(ctx);

    this.actors.forEach((actor) => {
        
        if (!actor.statusCode) {
            return;
        }

        actor.draw(ctx);
    });

    for (msg in this.messages) {
        if (this.messages.hasOwnProperty(msg)) {

            this.messages[msg].draw(ctx);
        }
    }
};

Scene.prototype.update = function(keysDown, delta) {

    this.player.update(keysDown, this.actors);

    this.messages.headerLeft.update(delta);
    this.messages.headerRight.update(this.player.score);
    this.messages.headerCenter.update(this.player.multiplier);
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
                    break;

                case "@":
                    if (!this.playerLocation) {

                        this.playerLocation = {
                            x: x,
                            y: y
                        };
                    }
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.init = function(canvas) {

    this.background = new Background(canvas, this.colors.background);

    this.player = new Player(canvas, this.colors.player, this.blockSize);

    if (this.playerLocation) {
        this.player.x = this.playerLocation.x;
        this.player.y = this.playerLocation.y;
    }

    this.messages = {
        headerLeft: new HeaderText.Left(canvas.width, 24, this.colors.txt,
                "Time", 15),
        headerRight: new HeaderText.Right(canvas.width, 24, this.colors.txt,
                "Score", 0),
        headerCenter: new HeaderText.Center(canvas.width, 24, this.colors.txt,
                "Multiplier", 1)
    };
};

module.exports = Scene;

},{"./background":1,"./block":2,"./headertext":5,"./pellet":7,"./player":8}],10:[function(require,module,exports){
var Scene = require("../Constructors/scene");

var level1 = new Scene();

level1.blockSize = 32;

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

level1.colors = {
    background: "red",
    wall: "black",
    pellet: "gold",
    player: "white",

    txt: {
        normal: "white"
    }
};

level1.planReader();

module.exports = level1;

},{"../Constructors/scene":9}],11:[function(require,module,exports){
var Scene = require("../Constructors/scene");

var level2 = new Scene();

level2.blockSize = 32;

level2.plan = [
    "################################",
    "######                    ######",
    "##        *          *        ##",
    "#                              #",
    "#     *    #   **   #    *     #",
    "#          #        #          #",
    "#         ##   **   ##         #",
    "###   ######        ######   ###",
    "#         ##   **   ##         #",
    "#          ##      ##          #",
    "#                              #",
    "#     *                  *     #",
    "#                              #",
    "#   #       ##    ##       #   #",
    "#  ##   *   #  @   #   *   ##  #",
    "####        #      #        ####",
    "###         #      #         ###",
    "################################"
];

level2.colors = {
    background: "coral",
    wall: "aqua",
    pellet: "gold",
    player: "white",

    txt: {
        normal: "white"
    }
};

level2.planReader();

module.exports = level2;

},{"../Constructors/scene":9}],12:[function(require,module,exports){
var canvas      = require("./canvas");
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

app.sceneLoader = function(i) {
    "use strict";

    this.scenario = this.scenes[i];
    this.scenario.init(canvas);

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

},{"./Levels/level1":10,"./Levels/level2":11,"./canvas":13,"./input":15,"./mainMenu":17,"./timer":20}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
module.exports = (mov, tar) => {
    "use strict";

    return mov.x < tar.x + tar.w &&
           mov.y < tar.y + tar.w &&
           tar.x < mov.x + mov.w &&
           tar.y < mov.y + mov.w;
};

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./app":12}],17:[function(require,module,exports){
var Menu        = require("./Constructors/menu");
var mainTitle   = require("./mainTitle");

var mainMenu = new Menu(42);

mainMenu.colors = {
    background: "black",
    selections: "white",
    cursor: "gold"
};

mainMenu.selections = [
    "level 1",
    "level 2",
    "controls"
];

mainMenu.mainTitle = mainTitle;

mainMenu.cursorData.w = 24;

module.exports = mainMenu;

},{"./Constructors/menu":6,"./mainTitle":18}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}]},{},[16]);
