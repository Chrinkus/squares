var Page            = require("./Constructors/page");

var pageTitle = "squares",
    pageFields = [
        ["game by", "Chris Schick"],
        ["", ""],
        ["thanks to", "David Wesst,"],
        ["", "Marijn Haverbeke,"],
        ["", "Nicholas C. Zakas,"],
        ["", "Codecademy, NodeSchool,"],
        ["", "Mozilla Developer Network"],
        ["", ""],
        ["& especially", "my wife, Caitlin"]
    ],
    columnStyle = "left",
    credits;

credits = new Page(pageTitle, pageFields, columnStyle);

credits.fieldXR = credits.headX;
credits.fieldXL = credits.headX - 50;
credits.leftColumnAlign = "right";

module.exports = credits;
