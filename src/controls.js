var Page            = require("./Constructors/page");

var pageTitle = "Movement",
    pageFields = [
        ["Direction", "Hot Keys"],
        ["=========", "========"],
        ["Up", "W"],
        ["Left", "A"],
        ["Down", "S"],
        ["Right", "D"]
    ],
    columnStyle = "center";

module.exports = new Page(pageTitle, pageFields, columnStyle);
