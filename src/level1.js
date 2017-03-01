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
