// Hihat Synthesis
//
// Special thanks to Joe Sullivan for the article:
// joesul.li/van/synthesizing-hi-hats

function Hihat(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
}

Hihat.prototype.setup = function() {
    let fundamental = 40,
        ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    this.bandpass = this.ctx.createBiquadFilter();
    this.bandpass.type = "bandpass";
    this.bandpass.frequency.value = 10000;

    this.highpass = this.ctx.createBiquadFilter();
    this.highpass.type = "highpass";
    this.highpass.frequency.value = 7000;
    
    this.gainEnv = this.ctx.createGain();

    this.oscs = ratios.map(ratio => {
        let osc = this.ctx.createOscillator();
        osc.type = "square";
        osc.frequency.value = fundamental * ratio;
        osc.connect(this.bandpass);
        return osc;
    });

    this.bandpass.connect(this.highpass);
    this.highpass.connect(this.gainEnv);
    this.gainEnv.connect(this.master ? this.master : this.ctx.destination);
};

Hihat.prototype.play = function(offset) {
    let time = this.ctx.currentTime + offset;
    this.setup();

    this.gainEnv.gain.setValueAtTime(1, time);
    this.gainEnv.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    this.oscs.forEach(osc => {
        osc.start(time);
        osc.stop(time + 0.05);
    });
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Hihat;
}
