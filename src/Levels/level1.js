var Scene = require("./scene");

var blockSize = 32,
    name = "Goggles",
    plan, colors, level1;

plan = [
    "################################",
    "###           ####           ###",
    "##    *   *    ##    *   *    ##",
    "#                              #",
    "#  *                        *  #",
    "#      ###            ###      #",
    "#     #####          #####     #",
    "#  *  #####          #####  *  #",
    "#     #####          #####     #",
    "#     #####          #####     #",
    "#  *  #####          #####  *  #",
    "#     #####          #####     #",
    "#      ###            ###      #",
    "#  *                        *  #",
    "#                              #",
    "##    *   *    ##    *   *    ##",
    "###           ####           ###",
    "################################"
];

colors = {
    background: "red",
    wall: "midnightblue",
    pellet: "gold"
};

level1 = new Scene(blockSize, name, plan, colors);

level1.timer = 20;
level1.defaultScore = 1000;
level1.playerData.color = "white";

module.exports = level1;
