var Scene = require("../Constructors/scene");

var blockSize = 32,
    name = "Village",
    plan, colors, level5;

plan = [
    "########################################################################",
    "#                    C C      C  C C  C      C C      L    L  *        #",
    "#              L     CC CCCCCC CC C CC CCCCCC CC     LLL  LLL     *    #",
    "#             LLL  L C                                #    LL       L  #",
    "#   *          #  LLLC                               CCCCC #       LLL #",
    "#                 LLLC    *              *           CC CC         LLL #",
    "#  *    L          # C                               CCCCC          #  #",
    "#      LLL         # C C    C  WCCCCCW         C     CCCCC       L  #  #",
    "#   L  LLL  L        CCC    CCCCCWWWCCCCCCCCCCCC                LLL    #",
    "#  LLL  #  LLL                   WWW     *  *                    #     #",
    "#  LLL  #   #                     W                                    #",
    "#   #                                                ###  ##    ##     #",
    "#   #   ## #### ##                                   #           #     #",
    "#   *   #        #                                       *       #     #",
    "#                                                    #        *  #     #",
    "#       #   *                     W                  #       CCC #     #",
    "#       #                         W                  ##    ### ###     #",
    "#       #                         W                                    #",
    "#       #        #                W                                    #",
    "#       #        #                W                                    #",
    "#           *    #               WWW                                   #",
    "#       #        #             WWWWWWW               #   #         CCC #",
    "#       ###    ###            WWWWWWWWW                   #        CWC #",
    "#                             WWWWWWWWW            #               CWC #",
    "#                             WWWWWWWWW               **           CWC #",
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
    background: "black",
    wall: "saddlebrown",
    water: "blue",
    leaves: "green",
    castle: "grey",
    pellet: "gold"
};

level5 = new Scene(blockSize, name, plan, colors);

level5.timer = 60;
level5.defaultScore = 2000;
level5.playerData.color = "white";

module.exports = level5;
