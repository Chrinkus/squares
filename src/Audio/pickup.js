function Pickup(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
}

Pickup.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();
    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.master ? this.master : this.ctx.destination);
};

Pickup.prototype.play = function() {
    let now = this.ctx.currentTime;
    let dur = 0.5;
    let freq = 246.94;

    this.setup();

    this.osc.frequency.setValueAtTime(freq, now);
    this.gainEnv.gain.setValueAtTime(0.15, now);

    this.osc.frequency.setValueAtTime(freq * 2, now + 0.1);
    this.gainEnv.gain.linearRampToValueAtTime(0.01, now + dur);

    this.osc.start(now);
    this.osc.stop(now + dur);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Pickup;
}
