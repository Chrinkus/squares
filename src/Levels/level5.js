var Scene = require("./scene");

var blockSize = 32,
    name = "Village",
    plan, colors, level5;

plan = [
    "########################################################################",
    "#                    C C      C  C C  C      C C      L    L  *        #",
    "#              L     CCCCCCCCCCCCCCCCCCCCCCCCCCC     LLL  LLL     *    #",
    "#             LLL  L C                                #   LLL       L  #",
    "#   *          #  LLLC                               CCCCC #       LLL #",
    "#                 LLLC    *              *           CC CC         LLL #",
    "#  *    L          # C                               CCCCC          #  #",
    "#      LLL         # C C    C  WCCCCCW         C     CCCCC      LLL #  #",
    "#   L  LLL  L        CCC    CCCCCWWWCCCCCCCCCCCC                LLL    #",
    "#  LLL  #  LLL                   CWC     *  *                    #     #",
    "#  LLL  #   #                    CCC                                   #",
    "#   #                                                ###  ##    ##     #",
    "#   #   ## #### ##                                   #           #     #",
    "#   *   #        #                                       *       #     #",
    "#                                CCC                 #        *  #     #",
    "#       #   *                    CWC                 #       CCC #     #",
    "#       #                         W                  ##    ### ###     #",
    "#       #                         W                                    #",
    "#       #        #                W                                    #",
    "#       #        #                W                                    #",
    "#           *    #               WWW                                   #",
    "#       #        #             WWWWWWW               #  #          CCC #",
    "#       ###    ###            WWWCCCWWW                   #        CWC #",
    "#                             WWWCWCWWW            #               CWC #",
    "#                             WWWCCCWWW               **           CWC #",
    "#                              WWWWWWW                **           CWC #",
    "#                                WWW               #               CWC #",
    "#                                                         #        CWC #",
    "#      ####    ####        L                         #  #          CCC #",
    "#      #CC        #        L                                           #",
    "#      #CC   *  CC#       LLL                                       *  #",
    "#      #        CC#       LLL                                          #",
    "#      #          #      LLLLL                ####################     #",
    "#      # *        #        #                                           #",
    "#      #          #                             *              *       #",
    "#      #######    #                                  *    *            #",
    "#                                                                      #",
    "#   CCC                          C    C       ####################     #",
    "#   CWC                          C @  C                                #",
    "#   CCC                          C    C                                #",
    "#                               *CCCCCC                                #",
    "########################################################################"
];

colors = {
    background: "yellowgreen",
    wall: "saddlebrown",
    water: "blue",
    leaves: "darkgreen",
    castle: "grey",
    pellet: "gold"
};

level5 = new Scene(blockSize, name, plan, colors);

level5.timer = 60;
level5.defaultScore = 2000;
level5.playerData.color = "white";

module.exports = level5;
