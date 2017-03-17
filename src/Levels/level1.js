var Scene = require("../Constructors/scene");

var level1 = new Scene(32);

level1.plan = [
    "################################",
    "###           ####           ###",
    "##    *   *    ##    *   *    ##",
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
    "##    *   *    ##    *   *    ##",
    "###           ####           ###",
    "################################"
];

level1.timer = 20;
level1.hiScore = 2000;      // temp solution

level1.playerData.color = "white";

level1.colors = {
    background: "red",
    wall: "black",
    pellet: "gold",

    txt: {
        normal: "white"
    }
};

level1.planReader();

module.exports = level1;
