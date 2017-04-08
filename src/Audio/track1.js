let Tone        = require("./tone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let Part        = require("./part");
let meter       = require("./meter");
let scale       = require("./scale");

let track = (function() {
    "use strict";
    let track           = Object.create(null),
        voiceParts      = ["lead", "bass"],
        rhythmParts     = ["kick", "snare", "hihat"],
        units           = "eighth",
        voicePlan,
        rhythmPlan,
        prop;

    meter.tempo = 120;

    // Define track properties
    voiceParts.forEach(part => {
        track[part] = new Part(part);
    });

    rhythmParts.forEach(part => {
        track[part] = new Part(part);
    });

    // The music
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

    rhythmPlan = {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    };

    // Parse music
    for (prop in voicePlan) {

        voicePlan[prop].forEach((entry, i) => {
            if (entry) {
                let data = entry.split(",");
                
                track[prop].schedule.push({
                    frequency: scale[data[0]],
                    duration: meter.getDur(data[1]),
                    when: i * meter[units],
                    gain: 1
                });
            }
        });

        track[prop].loopTime = voicePlan[prop].length * meter[units];
        track[prop].active = false;
    }
    
    for (prop in rhythmPlan) {

        rhythm[prop].loopTime = rhythmPlan[prop].length * meter[units];

        rhythmPlan[prop].forEach((entry, i) => {
            if (entry) {
                track[prop].schedule.push({
                    when: i * meter[units],
                    gain: 1
                });
            }
        });

        track[prop].loopTime = rhythmPlan[prop].length * meter[units];
        track[prop].active = false;
    }

    return track;
}());

track.mix = function(masterVoices) {
    "use strict";
    masterVoices.gain.value = 0.2;
    this.bass.schedule.forEach(entry => entry.gain = 0.8);
};

track.init = function(ctx, masterVoices, masterRhythm) {
    "use strict";
    this.startTime = 0;

    this.lead.sound = new Tone(ctx, "triangle", masterVoices);
    this.bass.sound = new Tone(ctx, "sawtooth", masterVoices);

    this.kick.sound = new Kick(ctx, masterRhythm);
    this.snare.sound = new Snare(ctx, masterRhythm);
    this.hihat.sound = new Hihat(ctx, masterRhythm);

    this.mix(masterVoices);
};

track.start = function(time) {
    "use strict";
    this.startTime = time;
};

track.stop = function() {
    "use strict";
    let prop;

    this.startTime = 0;

    for (prop in this) {
        if (this[prop].active) {
            this[prop].active = false;
            this[prop].iterator = 0;
        }
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = track;
}
