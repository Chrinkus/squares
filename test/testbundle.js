(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var canvas          = require("./canvas");

function Camera(mapW, mapH) {
    "use strict";
    
    // INLINE TEST
    if (typeof mapW !== "number" || typeof mapH !== "number") {
        throw new Error("Camera received: " + mapW + ", " + mapH);
    }

    this.offsetMaxX = mapW - canvas.width;
    this.offsetMaxY = mapH - canvas.height;
    this.offsetMinX = 0;
    this.offsetMinY = 0;

    this.camX = 0;
    this.camY = 0;
}

Camera.prototype.update = function(playerXC, playerYC) {

    this.camX = playerXC - canvas.width / 2;
    this.camY = playerYC - canvas.height / 2;

    if (this.camX > this.offsetMaxX) {
        this.camX = this.offsetMaxX;

    } else if (this.camX < this.offsetMinX) {
        this.camX = this.offsetMinX;
    }

    if (this.camY > this.offsetMaxY) {
        this.camY = this.offsetMaxY;

    } else if (this.camY < this.offsetMinY) {
        this.camY = this.offsetMinY;
    }
};

module.exports = Camera;

},{"./canvas":2}],2:[function(require,module,exports){
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
var Camera          = require("../src/camera");

var badCamUndefined,
    badCamStringNums,
    badCamArray,
    badCamObj;

try {
    badCamUndefined = new Camera();
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamStringNums = new Camera("300", "450");
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamArray = new Camera([255, 127]);
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamObj = new Camera({ mapW: 1000, mapH: 700 });
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

},{"../src/camera":1}]},{},[3]);
