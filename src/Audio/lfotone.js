// Fixed Lfo modulated oscillator
function LfoTone(ctx, type) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
}

LfoTone.prototype.setup = function() {
    this.lfo = this.ctx.createOscillator();
    this.lfoEnv = this.ctx.createGain();
    this.osc = this.ctx.createOscillator();
    this.oscEnv = this.ctx.createGain();

    this.lfo.frequency.value = 12;
    this.lfoEnv.gain.value = 50;

    this.osc.type = this.type;

    this.lfo.connect(this.lfoEnv);
    this.lfoEnv.connect(this.osc.detune);
    this.osc.connect(this.oscEnv);
    this.oscEnv.connect(this.ctx.destination);
};

LfoTone.prototype.play = function(triggerTime, freq, dur) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(freq, time);
    this.oscEnv.gain.setValueAtTime(0.2, time);

    this.osc.start(time);
    this.lfo.start(time);
    this.osc.stop(time + dur);
    this.lfo.stop(time + dur);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = LfoTone;
}
