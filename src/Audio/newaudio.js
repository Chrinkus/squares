var track1          = require("./track1");

var audio = Object.create(null);

audio.ctx = new (window.AudioContext || window.webkitAudioContext)();

audio.setupRoutingGraph = function() {
    "use strict";
    this.compressor = this.ctx.createDynamicsCompressor();

    this.masterVoices = this.ctx.createGain();
    this.masterRhythm = this.ctx.createGain();
    this.masterFX = this.ctx.createGain();

    this.compressor.connect(this.ctx.destination);

    this.masterVoices.connect(this.compressor);
    this.masterRhythm.connect(this.compressor);
    this.masterFX.connect(this.compressor);
};

audio.bgmInit = function(track) {
    "use strict";
    this.setupRoutingGraph();
    track.init(this.ctx, this.masterVoices, this.masterRhythm);
};

audio.queueAhead = function(track) {
    "use strict";
    let now = this.ctx.currentTime,
        lookAhead = 0.1,                // 100ms lookahead
        prop;

    function queuer(part) {
        let offset;

        if (!part.loopStart) {
            part.loopStart = now;
        }
        
        offset = time - part.loopStart;
        
        while (part.schedule[0].when < (offset + lookAhead) % part.loopTime) {

            part.queue(offset % part.loopTime);
        }
    }

    for (prop in track.voices) {
        queuer(track.voices[prop]);
    }
    for (prop in track.rhythm) {
        queuer(track.rhythm[prop]);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;
}

// TESTING
function main() {
    "use strict";
    window.requestAnimationFrame(main);

    audio.queueAhead(track1);
}
audio.bgmInit(track1);
main();
