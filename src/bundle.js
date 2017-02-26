(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Background = require("./background");
var Player = require("./player");

var app = {

    assets: {

        background: null,
        actors: [],
        messages: []
    }
};

app.init = function(canvas) {
    "use strict";

    this.assets.background = new Background(canvas, "green");
    this.assets.actors[0] = new Player(canvas);
};

app.render = function(canvas) {
    "use strict";

    // Wipe canvas
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    this.assets.background.draw(canvas.ctx);

    // Static Player
    this.assets.actors.forEach((actor) => {
        actor.draw(canvas.ctx);
    });
};

app.update = function(tStamp) {
    "use strict";

    // Do nothing
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

    this.x = canvas.width / 2 - block / 2;
    this.y = canvas.height / 2 - block / 2;
    this.color = "white";

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

module.exports = Player;

},{}]},{},[4]);
