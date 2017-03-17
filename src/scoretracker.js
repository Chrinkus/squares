var toTenths        = require("./numstring").toTenths;

var scoreTracker = {

    score: 0,
    multiplier: 1,
    timeRemaining: 0,
    timeBonus: 0,
    total: 0,
    grandTotal: 0
};

scoreTracker.timeUpdate = function(delta) {
    "use strict";

    this.timeRemaining -= delta / 1000;
};

scoreTracker.displayTime = function() {
    "use strict";

    if (this.timeRemaining <= 0) {
        return "0.0";
    } else {
        return toTenths(this.timeRemaining);
    }
};

scoreTracker.displayMulti = function() {
    "use strict";

    return toTenths(this.multiplier);
};

scoreTracker.scoreInc = function(n) {
    "use strict";

    this.score += n * this.multiplier;
};

scoreTracker.multiUpdate = function(n) {
    "use strict";

    // Every method is universal except this one.
    if (n >= 96) {
        this.multiplier = 2;
    } else if (n >= 72) {
        this.multiplier = 1.5;
    } else if (n >= 48) {
        this.multiplier = 1;
    } else {
        this.multiplier = 0.5;
    }
};

scoreTracker.reset = function() {
    "use strict";

    this.score = 0;
    this.multiplier = 1;
    this.timeRemaining = 0;
    this.timeBonus = 0;
    this.total = 0;
};

scoreTracker.tabulate = function(time) {
    "use strict";

    this.timeRemaining = time;
    this.timeBonus = time * 10 * 25 * this.multiplier;
    this.total = this.score + this.timeBonus;
    this.grandTotal += this.total;
};

module.exports = scoreTracker;
