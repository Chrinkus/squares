(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = {};

app.render = function(canvas) {
    "use strict";

    // Easy references
    const ctx = canvas.ctx;
    const CW = canvas.width;
    const CH = canvas.height;

    // Wipe canvas
    ctx.clearRect(0, 0, CW, CH);

    // Background
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, CW, CH);

    // Simple ball
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
};

app.update = function(tStamp) {
    "use strict";

    // Do nothing
};

module.exports = app;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var app = require("./app");

(function() {
    "use strict";

    var canvas = require("./canvas");

    var main = function(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render(canvas);

        app.update(tStamp);
    };

    main();

}());

},{"./app":1,"./canvas":2}]},{},[3]);
