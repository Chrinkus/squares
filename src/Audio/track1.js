var Meter       = require("./meter");

var track = (function() {
    "use strict";
    let voices = Object.create(null),
        rhythm = Object.create(null),
        voiceParts = ["lead", "bass"],
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
            "A3,hq", "", "", "", "", "", "F#/Gb3,q", "",
            "C4,qe", "", "", "B3,q", "", "A3,q", "", "G3,e",
            "A3,he", "", "", "", "", "E3,e", "G3,e", "D3,he",
            "", "", "", "", "D3,e", "E3,e", "G3,e", "F#/Gb3,e"
        ],
        bass: [
            "D2,e", "", "", "D2,e", "", "", "", "",
            "D2,e", "", "", "D2,e", "", "", "", "",
            "C2,e", "", "", "C2,e", "", "", "", "",
            "G2,e", "", "", "G2,e", "", "", "", ""
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
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    };

    for (prop in rhythmPlan) {

        rhythmPlan[prop].forEach((entry, i) => {
            if (entry) {
                rhythm[prop].schedule.push(i * meter.eighth);
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
