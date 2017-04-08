function LfoTone(ctx, type, master) {
    "use strict";
    this.ctx        = ctx;
    this.type       = type;
    this.master     = master || null;
}

LfoTone.prototype.setup = function() {
    this.lfo        = this.ctx.createOscillator();
    this.gainLfo    = this.ctx.createGain();
    this.osc        = this.ctx.createOscillator();
    this.osc.type   = this.type;
    this.gainOsc    = this.ctx.createGain();

    this.lfo.connect(this.gainLfo);
    this.gainLfo.connect(this.osc.detune);
    this.osc.connect(this.gainOsc);
    this.gainOsc.connect(this.master ? this.master : this.ctx.destination);
};

LfoTone.prototype.play = function(offset, dataObj) {
    /* dataObj
     *   oscFrequency   "number"    sound in Hz
     *   lfoFrequency   "number"    modulation signal in Hz
     *   duration       "number"    held length of note
     *   when           "number"    time location in loop (not used here)
     *   oscGain        "number"    between -1 and 1 for track mixing
     *   lfoGain        "number"    amplitude of lfo
     */

    let time = this.ctx.currentTime + offset;
    this.setup();

    this.lfo.frequency.setValueAtTime(dataObj.lfoFrequency, time);
    this.gainLfo.gain.setValueAtTime(dataObj.lfoGain, time);

    this.osc.frequency.setValueAtTime(dataObj.oscFrequency, time);
    this.gainOsc.gain.setValueAtTime(dataObj.oscGain, time);

    this.osc.start(time);
    this.lfo.start(time);
    this.osc.stop(time + dataObj.duration);
    this.lfo.stop(time + dataObj.duration);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = LfoTone;
}
