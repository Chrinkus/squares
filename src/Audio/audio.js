let Tone        = require("./tone");
let LfoTone     = require("./lfotone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let scale       = require("./scale");
let timer       = require("../timer");
let track1      = require("./track1");
let track2      = require("./track2");

let audio = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    loopTime: 8000,
    counter: 1
};

audio.populate = function() {
    "use strict";
    this.voices.lead.sound = new Tone(this.ctx, "triangle");
    this.voices.bass.sound = new Tone(this.ctx, "sawtooth");

    this.voices2.lead.sound = new LfoTone(this.ctx, "triangle");

    this.rhythm.kick.sound = new Kick(this.ctx);
    this.rhythm.snare.sound = new Snare(this.ctx);
    this.rhythm.hihat.sound = new Hihat(this.ctx);

    this.rhythm2.kick.sound = new Kick(this.ctx);
    this.rhythm2.snare.sound = new Snare(this.ctx);
    this.rhythm2.hihat.sound = new Hihat(this.ctx);
};

audio.queueNext = function(scene) {
    "use strict";
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
