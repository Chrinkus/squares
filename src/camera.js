var canvas          = require("./canvas");

function Camera(mapW, mapH) {
    "use strict";

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
