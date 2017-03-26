var Scene = require("../Constructors/scene");

var level1 = new Scene(32);

level1.name = "Goggles";
level1.defaultScore = 1000;

level1.timer = 20;

level1.plan = [
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

level1.playerData.color = "white";

level1.colors = {
    background: "red",
    wall: "midnightblue",
    pellet: "gold"
};

level1.planReader();

module.exports = level1;
