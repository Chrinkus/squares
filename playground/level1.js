// Level 1 of Squares

var Scene = require("./scene");

var level1 = new Scene();

level1.blockSize = 32;

level1.plan = [
    "################################",
    "#                              #",
    "#     $   $          $   $     #",
    "#                              #",
    "#  $                        $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $  ####            ####  $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $  ####            ####  $  #",
    "#     ####            ####     #",
    "#     ####            ####     #",
    "#  $                        $  #",
    "#                              #",
    "#     $   $          $   $     #",
    "#                              #",
    "################################"
];

level1.colors = {
    background: "green",
    wall: "black",
    coin: "orange"
};

level1.planReader();

module.exports = level1;
