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

level2.colors = {
    background: "coral",
    wall: "aqua",
    pellet: "gold",
    player: "white",

    txt: {
        normal: "white"
    }
};

level2.planReader();

module.exports = level2;
