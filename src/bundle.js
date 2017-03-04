(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
function Coin(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.r = blockSize / 2;
    this.x = x + this.r;
    this.y = y + this.r;
    this.color = color;

    this.collision = "soft";
    this.statusCode = 1;

    this.path = (function() {
        var path = new Path2D();
        path.arc(that.x, that.y, that.r, 0, Math.PI * 2);
        return path;
    }());
}

Coin.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Coin;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var Player = require("./player");
var keysDown = require("./input").keysDown;
var level1 = require("./level1");

var app = {

    player: null,
    scenario: null
};

app.init = function(canvas) {
    "use strict";

    this.keysDown = keysDown();

    this.scenario = level1;
    this.scenario.bgInit(canvas);
    this.scenario.planReader();

    this.player = new Player(canvas, this.scenario.colors.player,
            this.scenario.blockSize);
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

        if (!actor.statusCode) {
            return;
        }

        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice
    this.player.update(this.keysDown, this.scenario.actors);
};

module.exports = app;

},{"./input":8,"./level1":9,"./player":11}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports = (mov, tar) => {
    "use strict";

    return mov.x < tar.x + tar.w &&
           mov.y < tar.y + tar.w &&
           tar.x < mov.x + mov.w &&
           tar.y < mov.y + mov.w;
};

},{}],8:[function(require,module,exports){
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

    if (87 in keysDown || 38 in keysDown) {
        cursor.i -= 1;
    }
    if (83 in keysDown || 40 in keysDown) {
        cursor.i += 1;
    }
};

},{}],9:[function(require,module,exports){
var Scene = require("./scene");

var level1 = new Scene();

level1.blockSize = 32;

level1.plan = [
    "################################",
    "###                          ###",
    "##    *   *          *   *    ##",
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
    "##    *   *          *   *    ##",
    "###                          ###",
    "################################"
];

level1.colors = {
    background: "red",
    wall: "black",
    pellet: "gold",
    player: "white"
};

level1.planReader();

module.exports = level1;

},{"./scene":12}],10:[function(require,module,exports){
var app = require("./app");

(function() {
    "use strict";

    var canvas = require("./canvas");

    app.init(canvas);

    function main(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render(canvas);

        app.update(tStamp);
    }

    main();

}());

},{"./app":4,"./canvas":6}],11:[function(require,module,exports){
var collision = require("./collision");
var move8 = require("./input.js").move8;

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

    this.path = function(x, y) {
        
        var path = new Path2D(),
            halfW = this.w / 2;

        path.rect(x, y, this.w, this.w);
        return path;
    };

    this.shrink = function() {
        this.x += 2;
        this.y += 2;
        this.w -= 4;
    };

    this.grow = function() {
        this.x -= 1;
        this.y -= 1;
        this.w += 2;
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

                if (this.w < this.maxW) {
                    this.grow();
                }
                return;
            }

            if (entity.collision === "hard") {

                this.x = snapshot.x;
                this.y = snapshot.y;

                if (this.w > this.minW) {
                    this.shrink();
                }
                return;
            }
        }
    });
};

module.exports = Player;

},{"./collision":7,"./input.js":8}],12:[function(require,module,exports){
var Block = require("../Path2D/block");
var Coin = require("../Path2D/coin");
var Pellet = require("../Path2D/pellet");
var Background = require("./background");

function Scene() {
    "use strict";

    this.blockSize = 0;
    this.plan = [];
    this.colors = null;

    this.background = null;
    this.actors = [];
}

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

                case "$":
                    this.actors.push(new Coin(x, y, this.colors.coin,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.bgInit = function(canvas) {

    this.background = new Background(canvas, this.colors.background);
};

module.exports = Scene;

},{"../Path2D/block":1,"../Path2D/coin":2,"../Path2D/pellet":3,"./background":5}]},{},[10]);
