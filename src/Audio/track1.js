var Tone        = require("./tone");
var Kick        = require("./kick");
var Snare       = require("./snare");
var Hihat       = require("./hihat");
var Part        = require("./part");
var Meter       = require("./meter");
var scale       = require("./scale");

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
        voices[part] = new Part(part);
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
        rhythm[part] = new Part(part);
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
                rhythm[prop].schedule.push({
                    when: i * meter.eighth
                });
            }
        });
    }

    return {
        voices: voices,
        rhythm: rhythm
    };
}());

track.init = function(ctx, masterVoices, masterRhythm) {
    "use strict";
    this.voices.lead.sound = new Tone(ctx, "triangle", masterVoices);
    this.voices.bass.sound = new Tone(ctx, "sawtooth", masterVoices);

    this.rhythm.kick.sound = new Kick(ctx, masterRhythm);
    this.rhythm.snare.sound = new Snare(ctx, masterRhythm);
    this.rhythm.hihat.sound = new Hihat(ctx, masterRhythm);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = track;
}

console.log(track.voices.lead.schedule);
console.log(track.rhythm.kick.schedule);
