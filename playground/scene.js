// Scene constructor
//
// Should consist of basic containers for assets

function Scene() {
    "use strict";

    this.blockSize = 0;
    this.plan = [];
    this.colors = null;

    this.background = null;
    this.actors = [];
}

Scene.prototype.planReader = function() {

    const BS = this.blockSize;

    this.plan.forEach((row, i) => {

        row.split("").forEach((character, j) => {

            var x = j * BS,
                y = i * BS;

            switch (character) {
                case "#":
                    this.actors.push(new Block(x, y, this.colors.wall, BS));
                    break;

                case "$":
                    this.actors.push(new Coin(x, y, this.colors.coin, BS));
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

// Plumbing
var canvas = document.getElementById("viewport");
var ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);

// What a "Scene" needs
//
// A Scene object can be a level in a game or a menu screen. Both can have 
// backgrounds and messages, game levels will have actors as well.
// 
// ** Menus MAY have actors - as the cursor accepts user input, perhaps the 
// ** cursor may be based on the player object(?)
//
// Feb 27 - A scene needs a plan/map

var testScene = new Scene();        // so far no goddamn point to construct

testScene.plan = [
    "################################",
    "#                              #",
    "#     $   $          $   $     #",
    "#                              #",
    "#  $                        $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $  ####            ####  $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $  ####            ####  $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $                        $  #",
    "#                              #",
    "#     $   $          $   $     #",
    "#                              #",
    "################################"
];

testScene.blockSize = 32;

testScene.colors = {
    background: "green",
    wall: "black",
    coin: "orange"
};

// Required constructors
function Block(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.x = x;
    this.y = y;
    this.w = blockSize;
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

testScene.background = new Background(canvas, testScene.colors.background);

testScene.planReader();

testScene.background.draw(ctx);
testScene.actors.forEach((actor) => {
    actor.draw(ctx);
});

