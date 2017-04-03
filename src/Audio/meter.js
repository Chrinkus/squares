function Meter(tempo) {
    "use strict";
    this.tempo = tempo;

    this.quarter    = 60 / tempo;
    this.half       = this.quarter * 2;
    this.whole      = this.quarter * 4;
    this.eighth     = this.quarter / 2;
    this.sixteenth  = this.quarter / 4;
}

Meter.prototype.getDur = function(string) {
    let dur = 0,
        l = string.length,
        i;

    for (i = 0; i < l; i++) {

        switch (string[i]) {
            case "q":
                dur += this.quarter;
                break;
            case "h":
                dur += this.half;
                break;
            case "w":
                dur += this.whole;
                break;
            case "e":
                dur += this.eighth;
                break;
            case "s":
                dur += this.sixteenth;
                break;
            default:
                // no default
        }
    }

    return dur;
};

module.exports = Meter;
