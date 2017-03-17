var Scene = require("../Constructors/scene");

var level2 = new Scene();

level2.blockSize = 32;

level2.plan = [
    "################################",
    "######                    ######",
    "##        *          *        ##",
    "#                              #",
    "#     *    #   **   #    *     #",
    "#          #        #          #",
    "#         ##   **   ##         #",
    "###   ######        ######   ###",
    "#         ##   **   ##         #",
    "#          ##      ##          #",
    "#                              #",
    "#     *                  *     #",
    "#                              #",
    "#   #       ##    ##       #   #",
    "#  ##   *   #  @   #   *   ##  #",
    "####        #      #        ####",
    "###         #      #         ###",
    "################################"
];

level2.timer = 20;
level2.hiScore = 2000;      // temp solution

level2.playerData.color = "white";

level2.colors = {
    background: "coral",
    wall: "aqua",
    pellet: "gold",

    txt: {
        normal: "white"
    }
};

level2.planReader();

module.exports = level2;
