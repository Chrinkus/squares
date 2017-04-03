function Hihat(ctx) {
    "use strict";
    this.ctx = ctx;
}

Hihat.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.osc.type = "square";

    this.bandpass = this.ctx.createBiquadFilter();
    this.bandpass.type = "bandpass";
    this.bandpass.frequency.value = 10000;

    this.highpass = this.ctx.createBiquadFilter();
    this.highpass.type = "highpass";
    this.highpass.frequency.value = 7000;
    
    this.gainEnv = this.ctx.createGain();
    this.osc.connect(this.bandpass);
    this.bandpass.connect(this.highpass);
    this.highpass.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Hihat.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(330, time);

    this.gainEnv.gain.setValueAtTime(1, time);
    this.gainEnv.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    this.osc.start(time);
    this.osc.stop(time + 0.05);
};

module.exports = Hihat;
