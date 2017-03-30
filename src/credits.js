var Page            = require("./Constructors/page");

var pageTitle = "squares",
    pageFields = [
        ["game by", "Chris Schick"],
        ["", ""],
        ["print resources", "Eloquent Javascript"],
        ["", "  by Marijn Haverbeke,"],
        ["", "Javascript: The Good Parts"],
        ["", "  by Douglas Crockford,"],
        ["", "Maintainable Javascript"],
        ["", "  by Nicholas C. Zakas"],
        ["", ""],
        ["online resources", "Codecademy, NodeSchool, 2ality"],
        ["", "Mozilla Developer Network"],
        ["", ""],
        ["special thanks for their", "David Wesst &"],
        ["love, support & encouragement", "my beautiful wife Caitlin"]
    ],
    columnStyle = "left",
    fieldFontSize = 20,
    credits;

credits = new Page(pageTitle, pageFields, columnStyle, fieldFontSize);

credits.fieldXR = credits.headX;
credits.fieldXL = credits.headX - 50;
credits.leftColumnAlign = "right";

module.exports = credits;
