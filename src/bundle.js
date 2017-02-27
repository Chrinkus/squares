(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Background = require("./background");
var Player = require("./player");

var app = {

    assets: {

        background: null,
        player: null,
        actors: [],
        messages: []
    }
};

app.init = function(canvas) {
    "use strict";

    this.inputs.init();

    this.assets.background = new Background(canvas, "green");
    this.assets.player = new Player(canvas);
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
    this.assets.background.draw(canvas.ctx);

    // Player
    this.assets.player.draw(canvas.ctx);

    /* Draw other assets
    this.assets.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
    */
};

app.update = function(tStamp) {
    "use strict";

    // Consider checking for game state: live, pause, chat, choice
    this.assets.player.update(this.inputs.keysDown);

    /*this.assets.actors.forEach((actor) => {
        actor.update(this.inputs.keysDown);
    });
    */
};

module.exports = app;

},{"./background":2,"./player":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./app":1,"./canvas":3}],5:[function(require,module,exports){
function Player(canvas) {
    "use strict";

    var block = 64;

    // Initial settings
    this.x = canvas.width / 2 - block / 2;
    this.y = canvas.height / 2 - block / 2;
    this.color = "white";

    // Movement speed
    this.dx = 5;
    this.dy = 5;

    this.path = function(x, y) {
        
        var path = new Path2D();
        path.rect(x, y, block, block);
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

},{}]},{},[4]);
