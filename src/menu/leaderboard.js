var Page            = require("./page");

var leaderboard = {
    pageTitle: "High Scores",
    columnHeaders: [
        ["Level", "Score"],
        ["=====", "====="]
    ],
    pageFields: [],
    columnStyle: "spread",
    board: null
};

leaderboard.populate = function(hiScores) {
    "use strict";
    this.pageFields = this.columnHeaders.concat(hiScores);
    this.board = new Page(this.pageTitle, this.pageFields, this.columnStyle);
};

module.exports = leaderboard;
