var Page            = require("./Constructors/page");
var scoreTracker    = require("./scoreTracker");

var leaderboard = {
    pageTitle: "High Scores",
    columnHeaders: [
        ["Level", "Score"],
        ["=====", "====="]
    ],
    pageFields: [],
    columnStyle: "spread"
};

leaderboard.populate = function() {
    "use strict";
    this.pageFields = columnHeaders.concat(scoreTracker.getScores());
};

leaderboard.board = new Page(this.pageTitle, this.pageFields,
        this.columnStyle);

module.exports = leaderboard;
