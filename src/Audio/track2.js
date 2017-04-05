var Meter       = require("./meter");

var track = (function() {
    "use strict";
    let voices = Object.create(null),
        rhythm = Object.create(null),
        voiceParts = ["lead"],
        rhythmParts = ["kick", "snare", "hihat"],
        meter = new Meter(120),
        voicePlan,
        rhythmPlan,
        prop;

    voiceParts.forEach(part => {
        voices[part] = Object.create(null);
        voices[part].schedule = [];
    });

    voicePlan = {
        lead: [
            "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
            "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
            "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
            "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
        ]
    };

    for (prop in voicePlan) {
        
        voicePlan[prop].forEach((entry, i) => {
            if (entry) {
                let data = entry.split(",");
                
                voices[prop].schedule.push({
                    frequency: scale[data[0]],
                    duration: meter.getDur(data[1]),
                    when: i * meter.eighth
                });
            }
        });
    }
    
    rhythmParts.forEach(part => {
        rhythm[part] = Object.create(null);
        rhythm[part].schedule = [];
    });

    rhythmPlan = {
        kick:  [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1,],

        hihat: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,]
    };

    for (prop in rhythmPlan) {

        rhythmPlan[prop].forEach((entry, i) => {
            if (entry) {
                rhythm[prop].schedule.push(i * meter.sixteenth);
            }
        });
    }

    return {
        voices: voices,
        rhythm: rhythm
    };
}());

if (typeof module !== "undefined" && module.exports) {
    module.exports = track;
}
