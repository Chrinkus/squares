var Scene = require("../Constructors/scene");

var level4 = new Scene(32);

level4.name = "Trash";
level4.defaultScore = 1000;

level4.timer = 40;

level4.plan = [
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

level4.playerData.color = "white";

level4.colors = {
    background: "gray",
    wall: "sienna",
    pellet: "gold"
};

//level4.planReader();

module.exports = level4;
