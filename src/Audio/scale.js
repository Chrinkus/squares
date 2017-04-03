module.exports = (function() {
    "use strict";

    const A = 27.5;
    const SEMITONES = ["A", "A#/Bb", "B", "C", "C#/Db", "D",
                       "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];
    let scale = {};
    let oct = 0;
    let i, j;

    function getFrequency(centOffset) {
        return Math.pow(2, (centOffset / 1200)) * A;
    }

    for (i = 0; i < 9; i++) {

        for (j = 0; j < 12; j++) {
            scale[SEMITONES[j] + oct] = getFrequency(i * 1200 + (j * 100));

            if (SEMITONES[j + 1] === "C") {
                oct += 1;
            }
        }
    }

    return scale;
}());
