var Scene = require("../Constructors/scene");

var level2 = new Scene(32);

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

level2.timer = 20;
level2.hiScore = 2000;      // temp solution

level2.playerData.color = "white";

level2.colors = {
    background: "cornflowerblue",
    wall: "indigo",
    pellet: "gold"
};

level2.planReader();

module.exports = level2;
