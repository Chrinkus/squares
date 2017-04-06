function Hihat(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master;
}

Hihat.prototype.setup = function() {
    "use strict";
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
    this.gainEnv.connect(this.master);
};

Hihat.prototype.play = function(dataObj, offset) {
    "use strict";
    let time = this.ctx.currentTime + offset;
    this.setup();

    this.osc.frequency.setValueAtTime(330, time);

    this.gainEnv.gain.setValueAtTime(1, time);
    this.gainEnv.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    this.osc.start(time);
    this.osc.stop(time + 0.05);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Hihat;
}
