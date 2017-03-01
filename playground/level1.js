var Scene = require("./scene");
var canvas = require("../src/canvas"); // testing

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

//module.exports = level1;

// testing
level1.bgInit(canvas);
canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
level1.background.draw(canvas.ctx);

level1.actors.forEach((actor) => {
    actor.draw(canvas.ctx);
});
