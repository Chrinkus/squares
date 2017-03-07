var Scene = require("../Constructors/scene");

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
