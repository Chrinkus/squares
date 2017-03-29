var Scene = require("../Constructors/scene");

var blockSize = 32,
    name = "Hogan",
    plan, colors, level2;

plan = [
    "################################",
    "######                    ######",
    "##        *          *        ##",
    "#                              #",
    "#     *        **   #    *     #",
    "#          #        #          #",
    "#         ##   **   ##         #",
    "###   ######        #####    ###",
    "#         ##   **   ##         #",
    "#          ###    ###          #",
    "#                              #",
    "#     *                  *     #",
    "#                              #",
    "#   #       ##    ##       #   #",
    "#  ##   *   #  @   #   *   ##  #",
    "####        #      #        ####",
    "###         #      #         ###",
    "################################"
];

colors = {
    background: "indigo",
    wall: "magenta",
    pellet: "gold"
};

level2 = new Scene(blockSize, name, plan, colors);

level2.timer = 20;
level2.defaultScore = 1000;
level2.playerData.color = "white";

module.exports = level2;
