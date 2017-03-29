var Scene = require("../Constructors/scene");

var blockSize = 32,
    name = "Trash",
    plan, colors, level4;

plan = [
    "################################",
    "######### @  #                 #",
    "#########    #      *   *      #",
    "############ #        #        #",
    "#####*###### #       ###       #",
    "##### ##   # #        #        #",
    "## ## ###### #      *   *      #",
    "## ##   ####  #                #",
    "####### ####   #          ###  #",
    "####### ####    #  ##   ##   * #",
    "####### ####        # ##   ##  #",
    "## #### ####     *  ##   ##    #",
    "## ##         *         #      #",
    "## ## ######      * ##   #     #",
    "##### ##  ##    *   # ## #     #",
    "##### ##  ##********#  # *     #",
    "###*  ######********#  #       #",
    "################################"
];

colors = {
    background: "gray",
    wall: "sienna",
    pellet: "gold"
};

level4 = new Scene(blockSize, name, plan, colors);

level4.timer = 40;
level4.defaultScore = 1000;
level4.playerData.color = "white";

module.exports = level4;
