function Tone(ctx, type, master) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
    this.master = master;
}

Tone.prototype.setup = function() {
    "use strict";
    this.osc = this.ctx.createOscillator();
    this.oscEnv = this.ctx.createGain();

    this.osc.type = this.type;

    this.osc.connect(this.oscEnv);
    this.oscEnv.connect(this.master);
};

Tone.prototype.play = function(triggerTime, freq, dur) {
    "use strict";
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(freq, time);
    this.oscEnv.gain.setValueAtTime(1, time);

    this.osc.start(time);
    this.osc.stop(time + dur);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Tone;
}
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
