let Tone        = require("./tone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let scale       = require("./scale");
let Meter       = require("./meter");
let timer       = require("../timer");

let audio = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    meter: new Meter(120),
    loopTime: 8000,
    counter: 1,

    voices: {
        lead: {
            sched: []
        },
        bass: {
            sched: []
        }
    },

    rhythm: {
        kick: {
            sched: []
        },
        snare: {
            sched: []
        },
        hihat: {
            sched: []
        }
    },

    voiceSchedule: {
        lead: [
            "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
            "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
            "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
            "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
        ],
        bass: [
            "D2,e", "", "", "D2,e", "", "", "", "",
            "D2,e", "", "", "D2,e", "", "", "", "",
            "C2,e", "", "", "C2,e", "", "", "", "",
            "G2,e", "", "", "G2,e", "", "", "", ""
        ]
    },

    rhythmSchedule: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    }
};

audio.populate = function() {
    "use strict";
    let prop;

    this.voices.lead.sound = new Tone(this.ctx, "sine");
    this.voices.bass.sound = new Tone(this.ctx, "sawtooth");

    this.rhythm.kick.sound = new Kick(this.ctx);
    this.rhythm.snare.sound = new Snare(this.ctx);
    this.rhythm.hihat.sound = new Hihat(this.ctx);

    for (prop in this.voiceSchedule) {
        this.voiceSchedule[prop].forEach((entry, i) => {

            if (entry) {
                let data = entry.split(",");
                
                this.voices[prop].sched.push({
                    freq: scale[data[0]],
                    dur: this.meter.getDur(data[1]),
                    time: i * this.meter.eighth
                });
            }
        });
    }

    for (prop in this.rhythmSchedule) {

        this.rhythmSchedule[prop].forEach((entry, i) => {
            if (entry) {
                this.rhythm[prop].sched.push(i * this.meter.eighth);
            }
        });
    }
};

audio.queueNext = function(scene) {
    "use strict";
    let prop;

    switch (scene) {
        case 4:
        case 3:
        case 2:
            this.voices.lead.sched.forEach(ele => {
                this.voices.lead.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });
        case 1:
            this.rhythm.kick.sched.forEach(ele => {
                this.rhythm.kick.sound.trigger(this.counter / 1000 + ele);
            });

            this.rhythm.snare.sched.forEach(ele => {
                this.rhythm.snare.sound.trigger(this.counter / 1000 + ele);
            });
        case 0:
            this.voices.bass.sched.forEach(ele => {
                this.voices.bass.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });

            this.rhythm.hihat.sched.forEach(ele => {
                this.rhythm.hihat.sound.trigger(this.counter / 1000 + ele);
            });
        default:
            // no default
    }
    /*
    for (prop in this.voices) {
        this.voices[prop].sched.forEach(ele => {
            this.voices[prop].sound.play(this.counter / 1000 + ele.time,
                    ele.freq, ele.dur);
        });
    }

    for (prop in this.rhythm) {
        this.rhythm[prop].sched.forEach(ele => {
            this.rhythm[prop].sound.trigger(this.counter / 1000 + ele);
        });
    }
    */

    this.counter = this.counter + this.loopTime;
};

audio.update = function(delta, scene) {
    "use strict";
    if (this.counter < 40) {
        this.queueNext(scene);
    }

    this.counter -= delta;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;   
}
