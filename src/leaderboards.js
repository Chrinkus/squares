var Page            = require("./Constructors/page");

var pageTitle = "High Scores",
    pageFields = [
        ["Level", "Score"],
        ["=====", "====="],
        ["Goggles", "2000"],
        ["Hogan", "2000"],
        ["Maise", "4000"],
        ["Trash", "TBD"],
        ["Village", "TBD"]
    ],
    columnStyle = "spread";

module.exports = new Page(pageTitle, pageFields, columnStyle);
