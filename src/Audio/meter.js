let meter = {

    set tempo(value) {
        this.bpm = value;

        this.quarter = 60 / value;
        this.half = this.quarter * 2;
        this.whole = this.quarter * 4;
        this.eighth = this.quarter / 2;
        this.sixteenth = this.quarter / 4;
    },

    getDur(string) {
        "use strict";
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
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = meter;
}
