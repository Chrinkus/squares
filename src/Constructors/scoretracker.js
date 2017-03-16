function ScoreTracker() {
    "use strict";

    this.score = 0;
    this.multiplier = 1;
    this.time = 0;
    this.timeBonus = 0;
    this.total = 0;
    this.grandTotal = 0;

    this.scoreInc = (n) => {
        this.score += n;
    };

    this.scoreIncM = (n) => {
        this.score += n * this.multiplier;
    };
}
