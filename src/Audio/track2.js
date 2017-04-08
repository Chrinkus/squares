let LfoTone     = require("./lfotone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let Part        = require("./part");
let meter       = require("./meter");
let scale       = require("./scale");

let track = (function() {
    "use strict";
    let track           = Object.create(null),
        voiceParts      = ["lead"],
        rhythmParts     = ["kick", "snare", "hihat"],
        units           = "sixteenth",
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
            "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
            "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
            "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
            "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
        ]
    };

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

    // Parse music
    for (prop in voicePlan) {

        voicePlan[prop].forEach((entry, i) => {
            if (entry) {
                let data = entry.split(",");
                
                track[prop].schedule.push({
                    oscFrequency: scale[data[0]],
                    duration: meter.getDur(data[1]),
                    when: i * meter["eighth"],
                    oscGain: 1,
                    lfoFrequency: 12,
                    lfoGain: 50
                });
            }
        });

        track[prop].loopTime = voicePlan[prop].length * meter["eighth"];
        track[prop].active = false;
    }
    
    for (prop in rhythmPlan) {

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
};

track.init = function(ctx, masterVoices, masterRhythm) {
    "use strict";
    this.startTime = 0;

    this.lead.sound = new LfoTone(ctx, "triangle", masterVoices);

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
