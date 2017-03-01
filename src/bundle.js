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

    this.collision = "hard";
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

},{"./level1":7,"./player":9}],5:[function(require,module,exports){
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
var Scene = require("./scene");

var level1 = new Scene();

level1.blockSize = 32;

level1.plan = [
    "################################",
    "#                              #",
    "#     *   *          *   *     #",
    "#                              #",
    "#  *                        *  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  *  ####            ####  *  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  *  ####            ####  *  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  *                        *  #",
    "#                              #",
    "#     *   *          *   *     #",
    "#                              #",
    "################################"
];

level1.colors = {
    background: "red",
    wall: "black",
    coin: "orange",
    pellet: "black"
};

level1.planReader();

module.exports = level1;

},{"./scene":10}],8:[function(require,module,exports){
var app = require("./app");

(function() {
    "use strict";

    var canvas = require("./canvas");

    app.init(canvas);

    var main = function(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render(canvas);

        app.update(tStamp);
    };

    main();

}());

},{"./app":4,"./canvas":6}],9:[function(require,module,exports){
function Player(canvas, blockSize) {
    "use strict";

    var _playerSize = blockSize * 2;

    // Initial settings
    this.x = canvas.width / 2 - blockSize;
    this.y = canvas.height / 2 - blockSize;
    this.color = "white";

    // Movement speed
    this.dx = 5;
    this.dy = 5;

    this.path = function(x, y) {
        
        var path = new Path2D();
        path.rect(x, y, _playerSize, _playerSize);
        return path;
    };
}

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.update = function(keysDown) {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Keyboard Input Legend
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Key          Keycode         Action
    // ===          =======         ======
    // w            87              Move upwards
    // a            65              Move leftwards
    // s            83              Move downwards
    // d            68              Move rightwards
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

    // Movement inputs
    if (87 in keysDown) {
        this.y -= this.dy;
    }
    if (83 in keysDown) {
        this.y += this.dy;
    }
    if (65 in keysDown) {
        this.x -= this.dx;
    }
    if (68 in keysDown) {
        this.x += this.dx;
    }
};

module.exports = Player;

},{}],10:[function(require,module,exports){
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

},{"../Path2D/block":1,"../Path2D/coin":2,"../Path2D/pellet":3,"./background":5}]},{},[8]);
