function Tone(ctx, type) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
}

Tone.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();

    this.osc.type = this.type;

    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Tone.prototype.play = function(triggerTime, freq, dur) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(freq, time);
    this.gainEnv.gain.setValueAtTime(0.2, time);

    this.osc.start(time);
    this.osc.stop(time + dur);
};

module.exports = Tone;
/*
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let tone = new Tone(audioCtx, "sawtooth");
let dur = 0.5;
tone.play(now, 110, dur);
tone.play(now + 2 * dur, 164.81, dur * 2);
tone.play(now + 4 * dur, 196, dur / 2);
tone.play(now + 6 * dur, 220, dur);
*/
