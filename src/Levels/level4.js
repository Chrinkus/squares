var Scene = require("../Constructors/scene");

var level4 = new Scene(32);

level4.plan = [
    "################################",
    "#       # @  #                 #",
    "#       #    #      *   *      #",
    "#   ### #### #        #        #",
    "#   #*#    # #       ###       #",
    "#   # #    # #        #        #",
    "#   # ###  # #      *   *      #",
    "#   #   #  #  #                #",
    "#   ### #  #   #          ###  #",
    "#     # #  #    #  ##   ##   * #",
    "#     # #  #        # ##   ##  #",
    "#   ### ####     *  ##   ##    #",
    "#   #         *         #      #",
    "#   # ######      * ##   #     #",
    "#   # #    #    *   # ## #     #",
    "# ### #    #********#  # *     #",
    "# #*  #    #********#  #       #",
    "################################"
];

level4.timer = 40;
level4.hiScore = 3000;      // temp solution

level4.playerData.color = "white";

level4.colors = {
    background: "gray",
    wall: "sienna",
    pellet: "gold"
};

level4.planReader();

module.exports = level4;
