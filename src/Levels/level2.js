var Scene = require("../Constructors/scene");

var level2 = new Scene(32);

level2.name = "Level 2";
level2.defaultScore = 1000;

level2.timer = 20;

level2.plan = [
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

level2.playerData.color = "white";

level2.colors = {
    background: "indigo",
    wall: "magenta",
    pellet: "gold"
};

level2.planReader();

module.exports = level2;
