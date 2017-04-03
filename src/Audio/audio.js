let Tone        = require("./tone");
let LfoTone     = require("./lfotone");
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

    voices2: {
        lead: {
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

    rhythm2: {
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
    },

    voiceSchedule2: {
        lead: [
            "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
            "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
            "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
            "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
        ]
    },


    rhythmSchedule: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    },

    rhythmSchedule2: {
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
    }
};

audio.populate = function() {
    "use strict";
    let prop;

    this.voices.lead.sound = new Tone(this.ctx, "triangle");
    this.voices.bass.sound = new Tone(this.ctx, "sawtooth");

    this.voices2.lead.sound = new LfoTone(this.ctx, "triangle");

    this.rhythm.kick.sound = new Kick(this.ctx);
    this.rhythm.snare.sound = new Snare(this.ctx);
    this.rhythm.hihat.sound = new Hihat(this.ctx);

    this.rhythm2.kick.sound = new Kick(this.ctx);
    this.rhythm2.snare.sound = new Snare(this.ctx);
    this.rhythm2.hihat.sound = new Hihat(this.ctx);

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

    for (prop in this.voiceSchedule2) {
        this.voiceSchedule2[prop].forEach((entry, i) => {

            if (entry) {
                let data = entry.split(",");
                
                this.voices2[prop].sched.push({
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

    for (prop in this.rhythmSchedule2) {

        this.rhythmSchedule2[prop].forEach((entry, i) => {
            if (entry) {
                this.rhythm2[prop].sched.push(i * this.meter.sixteenth);
            }
        });
    }
};

audio.queueNext = function(scene) {
    "use strict";
    let prop;

    switch (scene) {
        case 4:
            this.voices2.lead.sched.forEach(ele => {
                this.voices2.lead.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });
        case 3:
            this.rhythm2.kick.sched.forEach(ele => {
                this.rhythm2.kick.sound.trigger(this.counter / 1000 + ele);
            });
            this.rhythm2.snare.sched.forEach(ele => {
                this.rhythm2.snare.sound.trigger(this.counter / 1000 + ele);
            });
            this.rhythm2.hihat.sched.forEach(ele => {
                this.rhythm2.hihat.sound.trigger(this.counter / 1000 + ele);
            });
            break;

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

    this.counter = this.counter + this.loopTime;
};

audio.update = function(delta, scene) {
    "use strict";
    if (this.counter < 40) {
        this.queueNext(scene);
    }

    this.counter -= delta;
};

audio.resetCounter = function() {
    this.counter = 1;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;   
}
