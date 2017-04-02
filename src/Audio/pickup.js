function Pickup(ctx) {
    "use strict";
    this.ctx = ctx;
}

Pickup.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();
    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Pickup.prototype.trigger = function() {
    let now = this.ctx.currentTime;
    let dur = 0.5;
    let freq = 220;

    this.setup();

    this.osc.frequency.setValueAtTime(freq, now);
    this.gainEnv.gain.setValueAtTime(0.2, now);

    this.osc.frequency.setValueAtTime(freq * 2, now + 0.1);
    this.gainEnv.gain.linearRampToValueAtTime(0.01, now + dur);

    this.osc.start(now);
    this.osc.stop(now + dur);
};

module.exports = Pickup;
