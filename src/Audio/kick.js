// Kick Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Kick(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master || null;
}

Kick.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainOsc = this.ctx.createGain();
    this.osc.connect(this.gainOsc);

    this.gainOsc.connect(this.master ? this.master : this.ctx.destination);
};

Kick.prototype.play = function(offset) {
    let time = this.ctx.currentTime + offset;
    this.setup();

    this.osc.frequency.setValueAtTime(150, time);
    this.gainOsc.gain.setValueAtTime(1, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gainOsc.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc.start(time);
    this.osc.stop(time + 0.5);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Kick;
}
