// Snare Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Snare(ctx, master) {
    "use strict";
    this.ctx = ctx;
    this.master = master;
}

Snare.prototype.noiseBuffer = function() {
    // sampleRate = 44100 Hz
    let bufferSize = this.ctx.sampleRate;
    // creates a buffer w/1 channel, 44100 individual samples, @ 44100 Hz
    // for 1 second of audio
    let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    // buffer was created with 1 channel, accessed by 0 here
    let output = buffer.getChannelData(0);
    let i;

    // fill buffer w/random nums between -1 and 1
    for (i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    return buffer;
};

Snare.prototype.setup = function() {
    let noiseFilter;

    this.noise = this.ctx.createBufferSource();
    this.noise.buffer = this.noiseBuffer();

    noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);

    this.noiseGain = this.ctx.createGain();
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.master);

    this.osc = this.ctx.createOscillator();
    this.osc.type = "triangle";

    this.oscGain = this.ctx.createGain();
    this.osc.connect(this.oscGain);
    this.oscGain.connect(this.master);
};

Snare.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + (triggerTime || 0);

    this.setup();

    this.noiseGain.gain.setValueAtTime(1, time);
    this.noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    this.noise.start(time);

    this.osc.frequency.setValueAtTime(100, time);
    this.oscGain.gain.setValueAtTime(0.7, time);
    this.oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    this.osc.start(time);

    this.osc.stop(time + 0.02);
    this.noise.stop(time + 0.02);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Snare;
}
