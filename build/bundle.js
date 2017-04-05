(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let Tone        = require("./tone");
let LfoTone     = require("./lfotone");
let Kick        = require("./kick");
let Snare       = require("./snare");
let Hihat       = require("./hihat");
let scale       = require("./scale");
let Meter       = require("./meter");
let timer       = require("../timer");

let audio = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    meter: new Meter(120),
    loopTime: 8000,
    counter: 1,

    voices: {
        lead: {
            sched: []
        },
        bass: {
            sched: []
        }
    },

    voices2: {
        lead: {
            sched: []
        }
    },

    rhythm: {
        kick: {
            sched: []
        },
        snare: {
            sched: []
        },
        hihat: {
            sched: []
        }
    },

    rhythm2: {
        kick: {
            sched: []
        },
        snare: {
            sched: []
        },
        hihat: {
            sched: []
        }
    },

    voiceSchedule: {
        lead: [
            "A3,hq", "", "", "", "", "", "F#/Gb3,q", "",
            "C4,qe", "", "", "B3,q", "", "A3,q", "", "G3,e",
            "A3,he", "", "", "", "", "E3,e", "G3,e", "D3,he",
            "", "", "", "", "D3,e", "E3,e", "G3,e", "F#/Gb3,e"
        ],
        bass: [
            "D2,e", "", "", "D2,e", "", "", "", "",
            "D2,e", "", "", "D2,e", "", "", "", "",
            "C2,e", "", "", "C2,e", "", "", "", "",
            "G2,e", "", "", "G2,e", "", "", "", ""
        ]
    },

    voiceSchedule2: {
        lead: [
            "A4,hq", "", "", "", "", "", "F#/Gb4,q", "",
            "C5,qe", "", "", "B4,q", "", "A4,q", "", "G4,e",
            "A4,he", "", "", "", "", "E4,e", "G4,e", "D4,he",
            "", "", "", "", "D4,e", "E4,e", "G4,e", "F#/Gb4,e"
        ]
    },


    rhythmSchedule: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0,],

        hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
    },

    rhythmSchedule2: {
        kick:  [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,],

        snare: [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1,],

        hihat: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,]
    }
};

audio.populate = function() {
    "use strict";
    let prop;

    this.voices.lead.sound = new Tone(this.ctx, "triangle");
    this.voices.bass.sound = new Tone(this.ctx, "sawtooth");

    this.voices2.lead.sound = new LfoTone(this.ctx, "triangle");

    this.rhythm.kick.sound = new Kick(this.ctx);
    this.rhythm.snare.sound = new Snare(this.ctx);
    this.rhythm.hihat.sound = new Hihat(this.ctx);

    this.rhythm2.kick.sound = new Kick(this.ctx);
    this.rhythm2.snare.sound = new Snare(this.ctx);
    this.rhythm2.hihat.sound = new Hihat(this.ctx);

    for (prop in this.voiceSchedule) {
        this.voiceSchedule[prop].forEach((entry, i) => {

            if (entry) {
                let data = entry.split(",");
                
                this.voices[prop].sched.push({
                    freq: scale[data[0]],
                    dur: this.meter.getDur(data[1]),
                    time: i * this.meter.eighth
                });
            }
        });
    }

    for (prop in this.voiceSchedule2) {
        this.voiceSchedule2[prop].forEach((entry, i) => {

            if (entry) {
                let data = entry.split(",");
                
                this.voices2[prop].sched.push({
                    freq: scale[data[0]],
                    dur: this.meter.getDur(data[1]),
                    time: i * this.meter.eighth
                });
            }
        });
    }


    for (prop in this.rhythmSchedule) {

        this.rhythmSchedule[prop].forEach((entry, i) => {
            if (entry) {
                this.rhythm[prop].sched.push(i * this.meter.eighth);
            }
        });
    }

    for (prop in this.rhythmSchedule2) {

        this.rhythmSchedule2[prop].forEach((entry, i) => {
            if (entry) {
                this.rhythm2[prop].sched.push(i * this.meter.sixteenth);
            }
        });
    }
};

audio.queueNext = function(scene) {
    "use strict";
    let prop;

    switch (scene) {
        case 4:
            this.voices2.lead.sched.forEach(ele => {
                this.voices2.lead.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });
        case 3:
            this.rhythm2.kick.sched.forEach(ele => {
                this.rhythm2.kick.sound.trigger(this.counter / 1000 + ele);
            });
            this.rhythm2.snare.sched.forEach(ele => {
                this.rhythm2.snare.sound.trigger(this.counter / 1000 + ele);
            });
            this.rhythm2.hihat.sched.forEach(ele => {
                this.rhythm2.hihat.sound.trigger(this.counter / 1000 + ele);
            });
            break;

        case 2:
            this.voices.lead.sched.forEach(ele => {
                this.voices.lead.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });
        case 1:
            this.rhythm.kick.sched.forEach(ele => {
                this.rhythm.kick.sound.trigger(this.counter / 1000 + ele);
            });

            this.rhythm.snare.sched.forEach(ele => {
                this.rhythm.snare.sound.trigger(this.counter / 1000 + ele);
            });
        case 0:
            this.voices.bass.sched.forEach(ele => {
                this.voices.bass.sound.play(this.counter / 1000 + ele.time,
                        ele.freq, ele.dur);
            });

            this.rhythm.hihat.sched.forEach(ele => {
                this.rhythm.hihat.sound.trigger(this.counter / 1000 + ele);
            });
        default:
            // no default
    }

    this.counter = this.counter + this.loopTime;
};

audio.update = function(delta, scene) {
    "use strict";
    if (this.counter < 40) {
        this.queueNext(scene);
    }

    this.counter -= delta;
};

audio.resetCounter = function() {
    this.counter = 1;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = audio;   
}

},{"../timer":41,"./hihat":2,"./kick":3,"./lfotone":4,"./meter":5,"./scale":7,"./snare":8,"./tone":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
// Kick Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Kick(ctx) {
    "use strict";
    this.ctx = ctx;
}

Kick.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainOsc = this.ctx.createGain();
    this.osc.connect(this.gainOsc);
    this.gainOsc.connect(this.ctx.destination);
};

Kick.prototype.trigger = function(triggerTime) {
    let time = this.ctx.currentTime + (triggerTime || 0);

    this.setup();

    this.osc.frequency.setValueAtTime(150, time);
    this.gainOsc.gain.setValueAtTime(1, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gainOsc.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc.start(time);
    this.osc.stop(time + 0.5);
};

module.exports = Kick;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
function Meter(tempo) {
    "use strict";
    this.tempo = tempo;

    this.quarter    = 60 / tempo;
    this.half       = this.quarter * 2;
    this.whole      = this.quarter * 4;
    this.eighth     = this.quarter / 2;
    this.sixteenth  = this.quarter / 4;
}

Meter.prototype.getDur = function(string) {
    let dur = 0,
        l = string.length,
        i;

    for (i = 0; i < l; i++) {

        switch (string[i]) {
            case "q":
                dur += this.quarter;
                break;
            case "h":
                dur += this.half;
                break;
            case "w":
                dur += this.whole;
                break;
            case "e":
                dur += this.eighth;
                break;
            case "s":
                dur += this.sixteenth;
                break;
            default:
                // no default
        }
    }

    return dur;
};

module.exports = Meter;

},{}],6:[function(require,module,exports){
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
    let freq = 246.94;

    this.setup();

    this.osc.frequency.setValueAtTime(freq, now);
    this.gainEnv.gain.setValueAtTime(0.15, now);

    this.osc.frequency.setValueAtTime(freq * 2, now + 0.1);
    this.gainEnv.gain.linearRampToValueAtTime(0.01, now + dur);

    this.osc.start(now);
    this.osc.stop(now + dur);
};

module.exports = Pickup;

},{}],7:[function(require,module,exports){
module.exports = (function() {
    "use strict";

    const A = 27.5;
    const SEMITONES = ["A", "A#/Bb", "B", "C", "C#/Db", "D",
                       "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];
    let scale = {};
    let oct = 0;
    let i, j;

    function getFrequency(centOffset) {
        return Math.pow(2, (centOffset / 1200)) * A;
    }

    for (i = 0; i < 9; i++) {

        for (j = 0; j < 12; j++) {
            scale[SEMITONES[j] + oct] = getFrequency(i * 1200 + (j * 100));

            if (SEMITONES[j + 1] === "C") {
                oct += 1;
            }
        }
    }

    return scale;
}());

},{}],8:[function(require,module,exports){
// Snare Drum Synthesis
//
// Special thanks to Chris Lowis for the article:
// https://dev.opera.com/articles/drum-sounds-webaudio/

function Snare(ctx) {
    "use strict";
    this.ctx = ctx;
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
    this.noiseGain.connect(this.ctx.destination);

    this.osc = this.ctx.createOscillator();
    this.osc.type = "triangle";

    this.oscGain = this.ctx.createGain();
    this.osc.connect(this.oscGain);
    this.oscGain.connect(this.ctx.destination);
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

module.exports = Snare;

},{}],9:[function(require,module,exports){
function Tone(ctx, type) {
    "use strict";
    this.ctx = ctx;
    this.type = type;
}

Tone.prototype.setup = function() {
    this.osc = this.ctx.createOscillator();
    this.gainEnv = this.ctx.createGain();

    this.osc.type = this.type;

    this.osc.connect(this.gainEnv);
    this.gainEnv.connect(this.ctx.destination);
};

Tone.prototype.play = function(triggerTime, freq, dur) {
    let time = this.ctx.currentTime + triggerTime;
    this.setup();

    this.osc.frequency.setValueAtTime(freq, time);
    this.gainEnv.gain.setValueAtTime(0.2, time);

    this.osc.start(time);
    this.osc.stop(time + dur);
};

module.exports = Tone;
/*
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let now = audioCtx.currentTime;

let tone = new Tone(audioCtx, "sawtooth");
let dur = 0.5;
tone.play(now, 110, dur);
tone.play(now + 2 * dur, 164.81, dur * 2);
tone.play(now + 4 * dur, 196, dur / 2);
tone.play(now + 6 * dur, 220, dur);
*/

},{}],10:[function(require,module,exports){
var canvas          = require("./canvas");
var keysDown        = require("./input").keysDown;
var mainMenu        = require("./menu/mainMenu");
var Player          = require("./player");
var Confirmation    = require("./confirmation");
var scoreTracker    = require("./scoretracker");
var overlay         = require("./overlay");
var timer           = require("./timer");
var Camera          = require("./camera");
var level1          = require("./levels/level1");
var level2          = require("./levels/level2");
var level3          = require("./levels/level3");
var level4          = require("./levels/level4");
var level5          = require("./levels/level5");
var audio           = require("./Audio/audio");

var app = {

    audioCtx: audio.ctx,
    keysDown: keysDown(),
    player: null,
    scenario: null,
    currentScene: 0,
    scenes: [
        level1,
        level2,
        level3,
        level4,
        level5
    ],

    camera: null,
    state: ""
};

app.sceneLoader = function(i) {
    "use strict";

    if (!this.scenes[i]) {
        audio.ctx.suspend();
        return this.init(true);
    }

    this.scenario = this.scenes[i];
    this.currentScene = i;
    this.scenario.init();
    this.camera = new Camera(this.scenario.mapW, this.scenario.mapH);

    scoreTracker.timeRemaining = this.scenario.timer;
    scoreTracker.setHiScore(this.scenario.name);

    this.player = new Player(this.scenario.playerData, this.audioCtx);

    if (this.player.x === 0) {
        this.player.x = canvas.width / 2 - this.player.w / 2;
        this.player.y = canvas.height / 2 - this.player.w / 2;
    }

    this.state = "game";
};

app.init = function(reset) {
    "use strict";


    audio.ctx.resume();
    audio.populate();
    audio.resetCounter();
    scoreTracker.getHiScores(this.scenes);

    mainMenu.init((i) => {
        this.sceneLoader(i);
    }, scoreTracker.hiScores, this.audioCtx);

    this.state = "mainmenu";
};

app.render = function() {
    "use strict";

    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (this.state) {
        case "mainmenu":
            mainMenu.draw(canvas.ctx);
            break;

        case "game":
            canvas.ctx.save();
            canvas.ctx.translate(-this.camera.camX, -this.camera.camY);

            this.scenario.draw(canvas.ctx);
            this.player.draw(canvas.ctx);

            canvas.ctx.restore();

            overlay.draw(scoreTracker, this.player.pellets,
                    this.scenario.pellets);
            break;

        case "complete":
            this.scenario.draw(canvas.ctx);
            overlay.draw(scoreTracker, this.player.pellets,
                    this.scenario.pellets);
            scoreTracker.draw(this.scenario.colors.wall);
            this.confirmation.draw();

        default:
            // no default
    }
};

app.update = function(tStamp) {
    "use strict";
    timer.progress(tStamp);

    switch (this.state) {
        case "mainmenu":
            mainMenu.update(this.keysDown, timer.delta);
            break;

        case "game":
            this.player.update(this.keysDown, this.scenario.actors,
                    scoreTracker);
            this.camera.update(this.player.xC, this.player.yC);

            audio.update(timer.delta, this.currentScene);
            scoreTracker.timeUpdate(timer.delta);
            if (this.player.pellets === this.scenario.pellets) {
                this.state = "complete";
                scoreTracker.tabulate(this.scenario.name);

                this.confirmation = new Confirmation(() => {
                    delete this.confirmation;
                    scoreTracker.reset();
                    this.sceneLoader(this.currentScene + 1);
                }, " to continue ", this.audioCtx);
            }
            break;

        case "complete":
            audio.update(timer.delta, this.currentScene);
            this.confirmation.update(this.keysDown, timer.delta);

        default:
            // no default
    }
};

module.exports = app;

},{"./Audio/audio":1,"./camera":12,"./canvas":13,"./confirmation":15,"./input":17,"./levels/level1":19,"./levels/level2":20,"./levels/level3":21,"./levels/level4":22,"./levels/level5":23,"./menu/mainMenu":32,"./overlay":37,"./player":38,"./scoretracker":39,"./timer":41}],11:[function(require,module,exports){
function Background(width, height, color) {
    "use strict";

    this.xMax = width;
    this.yMax = height;
    this.color = color;
}

Background.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.xMax, this.yMax);
};

module.exports = Background;

},{}],12:[function(require,module,exports){
var canvas          = require("./canvas");

function Camera(mapW, mapH) {
    "use strict";
    
    // INLINE TEST
    if (typeof mapW !== "number" || typeof mapH !== "number") {
        throw new Error("Camera received: " + mapW + ", " + mapH);
    }

    this.offsetMaxX = mapW - canvas.width;
    this.offsetMaxY = mapH - canvas.height;
    this.offsetMinX = 0;
    this.offsetMinY = 0;

    this.camX = 0;
    this.camY = 0;
}

Camera.prototype.update = function(playerXC, playerYC) {

    this.camX = playerXC - canvas.width / 2;
    this.camY = playerYC - canvas.height / 2;

    if (this.camX > this.offsetMaxX) {
        this.camX = this.offsetMaxX;

    } else if (this.camX < this.offsetMinX) {
        this.camX = this.offsetMinX;
    }

    if (this.camY > this.offsetMaxY) {
        this.camY = this.offsetMaxY;

    } else if (this.camY < this.offsetMinY) {
        this.camY = this.offsetMinY;
    }
};

module.exports = Camera;

},{"./canvas":13}],13:[function(require,module,exports){
module.exports = (function() {

    var _canvasRef = document.getElementById("viewport");

    return {

        ctx: _canvasRef.getContext("2d"),

        get width() {
            // Lazy getter
            delete this.width;
            return this.width = _canvasRef.width;
        },

        get height() {
            // Lazy getter
            delete this.height;
            return this.height = _canvasRef.height;

        }
    };
}());

},{}],14:[function(require,module,exports){
module.exports = (mov, tar) => {
    "use strict";

    return mov.x < tar.x + tar.w &&
           mov.y < tar.y + tar.w &&
           tar.x < mov.x + mov.w &&
           tar.y < mov.y + mov.w;
};

},{}],15:[function(require,module,exports){
var canvas      = require("./canvas");
var fadeInOut   = require("./fadeinout");
var Kick        = require("./Audio/kick");

function Confirmation(f, msg, audioCtx) {
    "use strict";

    this.f = f;
    this.msg = msg || " ";

    this.x = canvas.width / 2;
    this.y = canvas.height - 48;
    this.font = "24px monospace";
    this.alpha = 1;
    this.display = `( Press SPACEBAR${this.msg})`;
    this.sound = new Kick(audioCtx);
}

Confirmation.prototype.draw = function() {

    var ctx = canvas.ctx;

    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(this.display, this.x, this.y);
    ctx.restore();
};

Confirmation.prototype.update = function(keysDown) {

    if (32 in keysDown) {
        delete keysDown[32];
        this.sound.trigger();
        return this.f();
    }

    this.alpha = fadeInOut(this.alpha);
};

module.exports = Confirmation;

},{"./Audio/kick":3,"./canvas":13,"./fadeinout":16}],16:[function(require,module,exports){
module.exports = (function() {
    "use strict";
    var counter = 0,
        fadeOut = true,
        inc = 0.05;

    return function(alpha) {
        
        if (counter > 2) {

            if (fadeOut) {
                alpha -= inc;
            } else {
                alpha += inc;
            }
            counter = 0;

        } else {
            counter += 1;
        }

        if (alpha <= 0) {
            alpha = 0;
            fadeOut = false;

        } else if (alpha >= 1) {
            alpha = 1;
            fadeOut = true;
        }
        return alpha;
    };
}());

},{}],17:[function(require,module,exports){
exports.keysDown = () => {
    "use strict";

    var keysDown = {};

    document.addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    return keysDown; // WORKS!!
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Keyboard Input Legend
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Key          Keycode         Action
// ===          =======         ======
// w            87              Move upwards
// a            65              Move leftwards
// s            83              Move downwards
// d            68              Move rightwards
//
// left arrow   37              Move leftwards
// up arrow     38              Move upwards
// right arrow  39              Move rightwards
// down arrow   40              Move downwards
//
// spacebar     32              Action (context sensitive)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

exports.move8 = (mover, keysDown) => {
    "use strict";
    var x = 0,
        y = 0,
        d;

    if (87 in keysDown || 38 in keysDown) {
        y -= mover.d;
    }
    if (83 in keysDown || 40 in keysDown) {
        y += mover.d;
    }
    if (65 in keysDown || 37 in keysDown) {
        x -= mover.d;
    }
    if (68 in keysDown || 39 in keysDown) {
        x += mover.d;
    }

    // Correct diagonal speed boost
    if (x && y) {
        d = Math.round(Math.sqrt(mover.d * 2));
        mover.x += x < 0 ? -d : d;
        mover.y += y < 0 ? -d : d;
    } else {
        mover.x += x;
        mover.y += y;
    }
};

exports.moveCursor = (cursor, keysDown) => {
    "use strict";
    var moved = false;

    if ((87 in keysDown || 38 in keysDown) && (cursor.i > cursor.iMin)) {
        cursor.i -= 1;
        moved = true;
    }
    if ((83 in keysDown || 40 in keysDown) && (cursor.i < cursor.iMax)) {
        cursor.i += 1;
        moved = true;
    }

    return moved;
};

},{}],18:[function(require,module,exports){
function Block(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.w = blockSize;
    this.x = x;
    this.y = y;
    this.color = color;

    this.collision = "hard";
    this.statusCode = 1;            // status codes to be defined in app.js

    // Static path pattern
    this.path = (function() {
        var path = new Path2D();
        path.rect(that.x, that.y, that.w, that.w);
        return path;
    }());
}

Block.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Block;

},{}],19:[function(require,module,exports){
var Scene = require("./scene");

var blockSize = 32,
    name = "Goggles",
    plan, colors, level1;

plan = [
    "################################",
    "###           ####           ###",
    "##    *   *    ##    *   *    ##",
    "#                              #",
    "#  *                        *  #",
    "#      ###            ###      #",
    "#     #####          #####     #",
    "#  *  #####          #####  *  #",
    "#     #####          #####     #",
    "#     #####          #####     #",
    "#  *  #####          #####  *  #",
    "#     #####          #####     #",
    "#      ###            ###      #",
    "#  *                        *  #",
    "#                              #",
    "##    *   *    ##    *   *    ##",
    "###           ####           ###",
    "################################"
];

colors = {
    background: "red",
    wall: "midnightblue",
    pellet: "gold"
};

level1 = new Scene(blockSize, name, plan, colors);

level1.timer = 20;
level1.defaultScore = 1000;
level1.playerData.color = "white";

module.exports = level1;

},{"./scene":25}],20:[function(require,module,exports){
var Scene = require("./scene");

var blockSize = 32,
    name = "Hogan",
    plan, colors, level2;

plan = [
    "################################",
    "######                    ######",
    "##        *          *        ##",
    "#                              #",
    "#     *        **   #    *     #",
    "#          #        #          #",
    "#         ##   **   ##         #",
    "###   ######        #####    ###",
    "#         ##   **   ##         #",
    "#          ###    ###          #",
    "#                              #",
    "#     *                  *     #",
    "#                              #",
    "#   #       ##    ##       #   #",
    "#  ##   *   #  @   #   *   ##  #",
    "####        #      #        ####",
    "###         #      #         ###",
    "################################"
];

colors = {
    background: "indigo",
    wall: "magenta",
    pellet: "gold"
};

level2 = new Scene(blockSize, name, plan, colors);

level2.timer = 20;
level2.defaultScore = 1000;
level2.playerData.color = "white";

module.exports = level2;

},{"./scene":25}],21:[function(require,module,exports){
var Scene = require("./scene");

var blockSize = 16,
    name = "Maise",
    plan, colors, level3;


plan = [
    "################################################################",
    "#              #           #                                   #",
    "#              #           #                                   #",
    "#    *    *    #           #                                   #",
    "#              #           #                                   #",
    "# *  ######  * #           #     #    *   #######   *    #     #",
    "#    #    #    #     #     #     ##        #   #        ##     #",
    "#    # @  #    #  *  #     #     # #        # #        # #     #",
    "#    #    #    #     #     #     #  #        #        #  #     #",
    "# *  #    #  * #######     #     #   #               #   #     #",
    "#              #     #     #     #    #             #    #     #",
    "#    *    *    #     #     #     #     #     *     #     #     #",
    "#              #           #     #     #     *     #     #     #",
    "#              #           #     #    #             #    #     #",
    "#######        #           #     #   #               #   #     #",
    "#              #           #     #  #        #        #  #     #",
    "#         *    #     #     #     # #        # #        # #     #",
    "#              #     #     #     ##        #   #        ##     #",
    "#              #     #######     #    *   #######   *    #     #",
    "#        #######                                               #",
    "#              #                                               #",
    "#    *         #                                               #",
    "#              #                                               #",
    "#              ###########################################  *  #",
    "#######        #  #  #  #  #  #  #  #  #  #  #           #     #",
    "#              #  #  #     #  #  #     #                 #     #",
    "#         *    #     #     #     #                       #     #",
    "#              #           #                             #     #",
    "#              #                                   #     #     #",
    "#        #######                             #     #     #     #",
    "#                                      #     #     #     #     #",
    "#                                #     #     #     #           #",
    "#    *                     #     #     #     #                 #",
    "#                    #  *  #     #  *           *              #",
    "#              #     #     #     #                             #",
    "################################################################"
];

colors = {
    background: "black",
    wall: "green",
    pellet: "gold"
};

level3 = new Scene(blockSize, name, plan, colors);

level3.timer = 50;
level3.defaultScore = 2000;
level3.playerData.color = "white";

module.exports = level3;

},{"./scene":25}],22:[function(require,module,exports){
var Scene = require("./scene");

var blockSize = 32,
    name = "Trash",
    plan, colors, level4;

plan = [
    "################################",
    "######### @  #                 #",
    "#########    #      *   *      #",
    "############ #        #        #",
    "#####*###### #       ###       #",
    "##### ##   # #        #        #",
    "## ## ###### #      *   *      #",
    "## ##   ####  #                #",
    "####### ####   #          ###  #",
    "####### ####    #  ##   ##   * #",
    "####### ####        # ##   ##  #",
    "## #### ####     *  ##   ##    #",
    "## ##         *         #      #",
    "## ## ######      * ##   #     #",
    "##### ##  ##    *   # ## #     #",
    "##### ##  ##********#  # *     #",
    "###*  ######********#  #       #",
    "################################"
];

colors = {
    background: "gray",
    wall: "sienna",
    pellet: "gold"
};

level4 = new Scene(blockSize, name, plan, colors);

level4.timer = 40;
level4.defaultScore = 1000;
level4.playerData.color = "white";

module.exports = level4;

},{"./scene":25}],23:[function(require,module,exports){
var Scene = require("./scene");

var blockSize = 32,
    name = "Village",
    plan, colors, level5;

plan = [
    "########################################################################",
    "#                    C C      C  C C  C      C C      L    L  *        #",
    "#              L     CCCCCCCCCCCCCCCCCCCCCCCCCCC     LLL  LLL     *    #",
    "#             LLL  L C                                #   LLL       L  #",
    "#   *          #  LLLC                               CCCCC #       LLL #",
    "#                 LLLC    *              *           CC CC         LLL #",
    "#  *    L          # C                               CCCCC          #  #",
    "#      LLL         # C C    C  WCCCCCW         C     CCCCC      LLL #  #",
    "#   L  LLL  L        CCC    CCCCCWWWCCCCCCCCCCCC                LLL    #",
    "#  LLL  #  LLL                   CWC     *  *                    #     #",
    "#  LLL  #   #                    CCC                                   #",
    "#   #                                                ###  ##    ##     #",
    "#   #   ## #### ##                                   #           #     #",
    "#   *   #        #                                       *       #     #",
    "#                                CCC                 #        *  #     #",
    "#       #   *                    CWC                 #       CCC #     #",
    "#       #                         W                  ##    ### ###     #",
    "#       #                         W                                    #",
    "#       #        #                W                                    #",
    "#       #        #                W                                    #",
    "#           *    #               WWW                                   #",
    "#       #        #             WWWWWWW               #  #          CCC #",
    "#       ###    ###            WWWCCCWWW                   #        CWC #",
    "#                             WWWCWCWWW            #               CWC #",
    "#                             WWWCCCWWW               **           CWC #",
    "#                              WWWWWWW                **           CWC #",
    "#                                WWW               #               CWC #",
    "#                                                         #        CWC #",
    "#      ####    ####        L                         #  #          CCC #",
    "#      #CC        #        L                                           #",
    "#      #CC   *  CC#       LLL                                       *  #",
    "#      #        CC#       LLL                                          #",
    "#      #          #      LLLLL                ####################     #",
    "#      # *        #        #                                           #",
    "#      #          #                             *              *       #",
    "#      #######    #                                  *    *            #",
    "#                                                                      #",
    "#   CCC                          C    C       ####################     #",
    "#   CWC                          C @  C                                #",
    "#   CCC                          C    C                                #",
    "#                               *CCCCCC                                #",
    "########################################################################"
];

colors = {
    background: "yellowgreen",
    wall: "saddlebrown",
    water: "blue",
    leaves: "darkgreen",
    castle: "grey",
    pellet: "gold"
};

level5 = new Scene(blockSize, name, plan, colors);

level5.timer = 60;
level5.defaultScore = 2000;
level5.playerData.color = "white";

module.exports = level5;

},{"./scene":25}],24:[function(require,module,exports){
function Pellet(x, y, color, blockSize) {
    "use strict";
    var that = this;

    this.w = blockSize / 2;
    this.x = x + this.w / 2;
    this.y = y + this.w / 2;
    this.color = color;

    this.collision = "soft";
    this.statusCode = 1;            // status codes to be defined in app.js

    // Static path pattern
    this.path = (function() {
        var path = new Path2D();
        path.rect(that.x, that.y, that.w, that.w);
        return path;
    }());
}

Pellet.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fill(this.path);
};

module.exports = Pellet;

},{}],25:[function(require,module,exports){
var Block       = require("./block");
var Pellet      = require("./pellet");
var Background  = require("../background");

function Scene(blockSize, name, plan, colors) {
    "use strict";

    this.blockSize = blockSize;
    this.name = name;
    this.plan = plan;
    this.colors = colors;
    this.mapW = plan[0].length * blockSize;
    this.mapH = plan.length * blockSize;

    // explicitly defined in level files
    this.timer = 0;
    this.defaultScore = 0;

    // defined in this.init(canvas)
    this.background = null;

    // defined in this.planReader()
    this.actors = [];
    this.pellets = 0;
    this.playerData = {
        x: 0,
        y: 0,
        b: blockSize,
        w: blockSize * 2
    };
}

Scene.prototype.draw = function(ctx) {

    var msg;

    this.background.draw(ctx);

    this.actors.forEach((actor) => {
        
        if (!actor.statusCode) {
            return;
        }

        actor.draw(ctx);
    });
};

Scene.prototype.planReader = function() {

    this.pellets = 0;

    this.plan.forEach((row, i) => {

        row.split("").forEach((character, j) => {

            var x = j * this.blockSize,
                y = i * this.blockSize;

            switch (character) {
                case "#":
                    this.actors.push(new Block(x, y, this.colors.wall,
                                this.blockSize));
                    break;

                case "W":
                    this.actors.push(new Block(x, y, this.colors.water,
                                this.blockSize));
                    break;

                case "L":
                    this.actors.push(new Block(x, y, this.colors.leaves,
                                this.blockSize));
                    break;

                case "C":
                    this.actors.push(new Block(x, y, this.colors.castle,
                                this.blockSize));
                    break;

                case "*":
                    this.actors.push(new Pellet(x, y, this.colors.pellet,
                                this.blockSize));
                    this.pellets += 1;
                    break;

                case "@":
                    this.playerData.x = x;
                    this.playerData.y = y;
                    break;

                default:
                    // Do nothing
            }
        });
    });
};

Scene.prototype.init = function() {

    this.background = new Background(this.mapW, this.mapH,
            this.colors.background);
    this.planReader();
};

module.exports = Scene;

},{"../background":11,"./block":18,"./pellet":24}],26:[function(require,module,exports){
var app = require("./app");

(function() {
    "use strict";

    app.init();

    function main(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render();

        app.update(tStamp);
    }

    main();

}());

},{"./app":10}],27:[function(require,module,exports){
var Page            = require("./page");

var pageTitle = "Movement",
    pageFields = [
        ["Direction", "Hot Keys"],
        ["=========", "========"],
        ["Up", "W"],
        ["Left", "A"],
        ["Down", "S"],
        ["Right", "D"]
    ],
    columnStyle = "center";

module.exports = new Page(pageTitle, pageFields, columnStyle);

},{"./page":35}],28:[function(require,module,exports){
function Cooldown(ms, f) {
    "use strict";
    
    this.ms = ms;
    this.counter = 0;
    this.callback = f;
}

Cooldown.prototype.increment = function(delta) {

    this.counter += delta;

    if (this.counter > this.ms) {
        this.callback();
    }
};

module.exports = Cooldown;

},{}],29:[function(require,module,exports){
var Page            = require("./page");

var pageTitle = "squares",
    pageFields = [
        ["game by", "Chris Schick"],
        ["", ""],
        ["print resources", "Eloquent Javascript"],
        ["", "  by Marijn Haverbeke,"],
        ["", "Javascript: The Good Parts"],
        ["", "  by Douglas Crockford,"],
        ["", "Maintainable Javascript"],
        ["", "  by Nicholas C. Zakas"],
        ["", ""],
        ["online resources", "Codecademy, NodeSchool, 2ality"],
        ["", "Mozilla Developer Network"],
        ["", ""],
        ["special thanks for their", "David Wesst &"],
        ["love, support & encouragement", "my beautiful wife Caitlin"]
    ],
    columnStyle = "left",
    fieldFontSize = 20,
    credits;

credits = new Page(pageTitle, pageFields, columnStyle, fieldFontSize);

credits.fieldXR = credits.headX;
credits.fieldXL = credits.headX - 50;
credits.leftColumnAlign = "right";

module.exports = credits;

},{"./page":35}],30:[function(require,module,exports){
var moveCursor  = require("../input").moveCursor;
var Cooldown    = require("./cooldown");
var Kick        = require("../Audio/kick");

function Cursor(menu, audioCtx) {
    "use strict";
    this.menu = menu;

    this.x = menu.cursorData.x;
    this.y = menu.cursorData.y;
    this.w = menu.cursorData.w;
    this.color = menu.colors.cursor;
    
    this.i = 0;
    this.iMin = 0;
    this.iMax = menu.selections.length - 1;
    this.offSet = menu.lineHeight;

    this.cooldown = null;
    this.moveSound = new Kick(audioCtx);

    this.path = function(y) {
        var path = new Path2D();
        path.rect(this.x, y, this.w, this.w);
        return path;
    };
}

Cursor.prototype.draw = function(ctx) {
    
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.y + this.i * this.offSet));

    ctx.restore();
};

Cursor.prototype.update = function(keysDown, delta) {

    if (this.cooldown) {
        this.cooldown.increment(delta);
        return;
    } else if (moveCursor(this, keysDown)) {
        this.cooldown = new Cooldown(250, () => {
            delete this.cooldown;
        });
        this.moveSound.trigger();
    }
};

module.exports = Cursor;

},{"../Audio/kick":3,"../input":17,"./cooldown":28}],31:[function(require,module,exports){
var Page            = require("./page");

var leaderboard = {
    pageTitle: "High Scores",
    columnHeaders: [
        ["Level", "Score"],
        ["=====", "====="]
    ],
    pageFields: [],
    columnStyle: "spread",
    board: null
};

leaderboard.populate = function(hiScores) {
    "use strict";
    this.pageFields = this.columnHeaders.concat(hiScores);
    this.board = new Page(this.pageTitle, this.pageFields, this.columnStyle);
};

module.exports = leaderboard;

},{"./page":35}],32:[function(require,module,exports){
var Menu        = require("./menu");
var mainTitle   = require("./mainTitle");

var font = 42,
    colors = {
        background: "black",
        selections: "white",
        cursor: "gold"
    },
    selections = [
        "new game",
        "leaderboard",
        "controls",
        "credits"
    ],
    mainMenu = null;

mainMenu = new Menu(font, colors, selections, mainTitle);

module.exports = mainMenu;

},{"./mainTitle":33,"./menu":34}],33:[function(require,module,exports){
module.exports = {

    text: "squares",
    textX: 0,
    textY: 0,
    textW: 0,
    font: "100px monospace",

    colors: {
        primary: "white",
        secondary: "gold"
    },

    init: function(canvas) {

        var ctx = canvas.ctx;

        ctx.font = this.font;
        this.textW = Math.floor(ctx.measureText(this.text).width);
        this.titleWidth = this.textW + 128;

        this.textX = canvas.width / 2 - this.titleWidth / 2 + 128;
        this.textY = canvas.height / 2 - 64;
    },

    draw: function(ctx) {

        ctx.save();

        // Main title
        ctx.fillStyle = this.colors.primary;
        ctx.font = this.font;
        ctx.fillText(this.text, this.textX, this.textY);

        // Large square
        ctx.fillRect(this.textX - 68, this.textY - 46, 48, 48);

        // Small squares
        ctx.fillStyle = this.colors.secondary;
        ctx.fillRect(this.textX - 68, this.textY - 82, 24, 24);
        ctx.fillRect(this.textX - 128, this.textY - 46, 24, 24);

        ctx.restore();
    }
};

},{}],34:[function(require,module,exports){
var canvas          = require("../canvas");
var Background      = require("../background");
var Confirmation    = require("../confirmation");
var Cursor          = require("./cursor");
var controls        = require("./controls");
var leaderboard     = require("./leaderboard");
var credits         = require("./credits");

function Menu(fontSize, colors, selections, mainTitle) {
    "use strict";

    this.menuState = "mainmenu";
    this.mainTitle = mainTitle || null;
    this.sceneLoaderHook = null;

    // Styling
    this.fontSize = fontSize;
    this.font = fontSize + "px monospace";
    this.lineHeight = Math.floor(fontSize * 1.2);
    this.colors = colors;

    // Positioning: Default
    this.menuX = canvas.width / 2;
    this.menuY = canvas.height / 2 + this.lineHeight;

    // Content
    this.selections = selections;
    this.background = new Background(canvas.width, canvas.height,
            this.colors.background);

    this.cursorData = {
        x: this.menuX,
        y: this.menuY - 24,
        w: 24
    };

    if (mainTitle) {
        this.mainTitle.init(canvas);

        // menu adjusments
        this.menuX = this.mainTitle.textX;
        this.cursorData.x = this.menuX - 40;
    }

}

Menu.prototype.mainConfirm = function() {

    this.confirmation = new Confirmation(() => {
        delete this.confirmation;
        this.select(this.cursor.i);
    }, " to confirm selection ", this.audioCtx);
};

Menu.prototype.init = function(sceneLoaderHook, hiScores, audioCtx) {
    this.sceneLoaderHook = sceneLoaderHook;
    leaderboard.populate(hiScores);
    this.audioCtx = audioCtx;

    this.cursor = new Cursor(this, audioCtx);
    this.mainConfirm();
};

Menu.prototype.draw = function(ctx) {

    this.background.draw(ctx);

    ctx.save();

    switch (this.menuState) {
        case "mainmenu":
            ctx.fillStyle = this.colors.selections;
            ctx.font = this.font;
            
            this.selections.forEach((selection, i) => {
                ctx.fillText(selection, this.menuX,
                        this.menuY + this.lineHeight * i);
            });

            if (this.mainTitle) {
                this.mainTitle.draw(ctx);
            }

            this.cursor.draw(ctx);
            break;

        case "controls":
            // controls
            controls.draw();
            break;

        case "leaderboard":
            // leaderboard
            leaderboard.board.draw();
            break;

        case "credits":
            // credits
            credits.draw();
            break;

        default:
            // no default
    }

    ctx.restore();

    if (this.confirmation) {
        this.confirmation.draw();
    }
};

Menu.prototype.update = function(keysDown, delta) {

    if (this.menuState === "mainmenu") {
        this.cursor.update(keysDown, delta);
    }

    if (this.confirmation) {
        this.confirmation.update(keysDown);
    }
};

Menu.prototype.select = function(i) {

    switch (this.selections[i]) {
        case "new game":
            // Launch new game at level 1
            this.sceneLoaderHook(i);
            break;

        case "leaderboard":
            // Need to populate leaderboard when & every time selected
            this.menuState = "leaderboard";

            this.confirmation = new Confirmation(() => {
                delete this.confirmation;

                this.menuState = "mainmenu";
                this.mainConfirm();
            }, " to return ", this.audioCtx);
            break;

        case "controls":
            this.menuState = "controls";

            this.confirmation = new Confirmation(() => {
                delete this.confirmation;

                this.menuState = "mainmenu";
                this.mainConfirm();
            }, " to return ", this.audioCtx);
            break;

        case "credits":
            this.menuState = "credits";

            this.confirmation = new Confirmation(() => {
                delete this.confirmation;

                this.menuState = "mainmenu";
                this.mainConfirm();
            }, " to return ", this.audioCtx);
            break;

        default:
            // Do nothing
    }
};

module.exports = Menu;

},{"../background":11,"../canvas":13,"../confirmation":15,"./controls":27,"./credits":29,"./cursor":30,"./leaderboard":31}],35:[function(require,module,exports){
var canvas          = require("../canvas");

function Page(pageTitle, pageFields, columnStyle, fieldFontSize) {
    "use strict";
    var xC = canvas.width / 2,
        yC = canvas.height / 2;

    this.pageTitle = pageTitle;
    this.pageFields = pageFields;
    this.leftColumnAlign = columnStyle === "spread" ? "left" : columnStyle;
    this.rightColumnAlign = columnStyle === "spread" ? "right" : columnStyle;

    this.textColor = "white";
    this.headerFontSize = 48;
    this.headerFont = this.headerFontSize + "px monospace";
    this.headerLineHeight = Math.floor(this.headerFontSize * 1.2);
    this.fieldFontSize = fieldFontSize || 32;
    this.fieldFont = this.fieldFontSize + "px monospace";
    this.fieldLineHeight = Math.floor(this.fieldFontSize * 1.2);
    this.textAreaWidth = columnStyle === "spread" ? 400 : 300;
    this.textAreaHeight = this.headerLineHeight + this.fieldLineHeight *
            this.pageFields.length;
    
    // Positions text slightly above middle
    this.headY = yC - this.textAreaHeight / 2;
    this.headX = xC;
    this.fieldY = yC - this.textAreaHeight / 2 + this.headerLineHeight; 
    this.fieldXL = xC - this.textAreaWidth / 2;
    this.fieldXR = xC + this.textAreaWidth / 2;
}

Page.prototype.draw = function() {

    var ctx = canvas.ctx;

    ctx.save();

    ctx.fillStyle = this.textColor;
    ctx.font = this.headerFont;
    ctx.textAlign = "center";
    ctx.fillText(this.pageTitle, this.headX, this.headY);
    ctx.font = this.fieldFont;

    this.pageFields.forEach((field, i) => {
        var y = this.fieldY + i * this.fieldLineHeight;

        ctx.textAlign = this.leftColumnAlign;
        ctx.fillText(field[0], this.fieldXL, y);

        ctx.textAlign = this.rightColumnAlign;
        ctx.fillText(field[1], this.fieldXR, y);
    });

    ctx.restore();
};

module.exports = Page;

},{"../canvas":13}],36:[function(require,module,exports){
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// toTenths
//
// @param {Number} val
// @return {String}
//
// Takes a value and converts it to a single decimal place string
// - may be refactored to take a second arg indicating # of decimal places
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.toTenths = (val) => {
    "use strict";
    var inTenths = Math.round(val * 10) / 10;
    
    return inTenths % 1 !== 0 ? inTenths.toString() : inTenths + ".0";
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// spaceFill
//
// @param {Number} val
// @param {Number} digits
// @return {String}
//
// Takes a numerical value and padds it with spaces to # of digits
// - may be refactored to take a third arg indicating what to pad with ex 0's
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
exports.spaceFill = (val, digits) => {
    "use strict";
    var valString = val.toString();

    while (valString.length < digits) {
        valString = " " + valString;
    }
    return valStr;
};

},{}],37:[function(require,module,exports){
var canvas          = require("./canvas");

var overlay = {

    positionUnits: Math.floor(canvas.width / 16),
    smallFontSize: 24,
    largeFontSize: 48,
    padding: 8,
    textColor: "white",
    fontFamily: "monospace"
};

overlay.drawScore = (function() {
    "use strict";
    var xL = this.positionUnits * 2,
        xR = this.positionUnits * 5,
        y = this.padding + this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        label = "Score";

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "left";
        ctx.fillText(label, xL, y);
        ctx.textAlign = "right";
        ctx.fillText(val, xR, y);
        ctx.restore();
    };
}.bind(overlay)());

overlay.drawHiScore = (function() {
    "use strict";
    var xL = canvas.width - this.positionUnits * 5,
        xR = canvas.width - this.positionUnits * 1,
        y = this.padding + this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        label = "HiScore";

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "left";
        ctx.fillText(label, xL, y);
        ctx.textAlign = "right";
        ctx.fillText(val, xR, y);
        ctx.restore();
    };
}.bind(overlay)());

overlay.drawTime = (function() {
    "use strict";
    var x = canvas.width / 2,
        y = this.padding + this.largeFontSize,
        font = `${this.largeFontSize}px ${this.fontFamily}`;

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.fillText(val, x, y);
        ctx.restore();
    };
}.bind(overlay)());

overlay.drawMultiplier = (function() {
    "use strict";
    var x = canvas.width - this.smallFontSize,
        y = canvas.height - this.smallFontSize * 2,
        font = `${this.largeFontSize}px ${this.fontFamily}`;

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "right";
        ctx.fillText(`x${val}`, x, y);
        ctx.restore();
    };
}.bind(overlay)());

overlay.drawPellets = (function() {
    "use strict";
    var x = canvas.width - this.smallFontSize - this.smallFontSize,
        y = canvas.height - this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        pelletColor = "gold",
        xP = canvas.width - this.smallFontSize - this.smallFontSize + 4,
        yP = canvas.height - this.smallFontSize - 16,
        wP = 16;

    return function(playerPellets, scenePellets) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "right";
        ctx.fillText(`${playerPellets} / ${scenePellets}`, x, y);
        ctx.fillStyle = pelletColor;
        ctx.fillRect(xP, yP, wP, wP);
        ctx.restore();
    };
}.bind(overlay)());

overlay.draw = function(scoreTracker, playerPellets, scenePellets) {
    "use strict";
    canvas.ctx.fillStyle = this.textColor;

    this.drawScore(scoreTracker.score);
    this.drawHiScore(scoreTracker.hiScore);
    this.drawTime(scoreTracker.displayTime());
    this.drawMultiplier(scoreTracker.displayMulti());
    this.drawPellets(playerPellets, scenePellets);
};

module.exports = overlay;

},{"./canvas":13}],38:[function(require,module,exports){
var collision       = require("./collision");
var move8           = require("./input").move8;
var Pickup          = require("./Audio/pickup");

function Player(playerData, audioCtx) {
    "use strict";

    this.x = playerData.x;
    this.y = playerData.y;
    this.w = playerData.w;
    this.b = playerData.b;
    this.minW = playerData.b / 2;
    this.maxW = playerData.b * 3;
    this.d = playerData.b / 8;
    this.color = playerData.color;

    this.pellets = 0;
    this.pickup = new Pickup(audioCtx);

    this.path = function(x, y) {
        var path = new Path2D();

        path.rect(x, y, this.w, this.w);
        return path;
    };
}

Object.defineProperties(Player.prototype, {

    "xC": {
        get: function() {
            return this.x + this.w / 2;
        }
    },

    "yC": {
        get: function() {
            return this.y + this.w / 2;
        }
    }
});

Player.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.fill(this.path(this.x, this.y));
};

Player.prototype.shrink = function() {

    this.x += 4;
    this.y += 4;
    this.w -= 8;
};

Player.prototype.grow = function() {

    this.x -= 2;
    this.y -= 2;
    this.w += 4;
};

Player.prototype.update = function(keysDown, actors, scoreTracker) {
    let soundPlayed = false;

    // Process move
    var snapshot = {
        x: this.x,
        y: this.y
    };

    move8(this, keysDown);

    //Check collision
    actors.forEach((actor) => {
        
        if (actor.statusCode === 0) {
            return;
        }

        if (collision(this, actor)) {

            if (actor.collision === "soft") {

                actor.statusCode = 0;

                scoreTracker.scoreInc(100);
                this.pellets += 1;

                if (!soundPlayed) {
                    this.pickup.trigger();
                    soundPlayed = true;
                }

                if (this.w < this.maxW) {
                    this.grow();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }

            if (actor.collision === "hard") {

                this.x = snapshot.x;
                this.y = snapshot.y;

                if (this.w > this.minW) {
                    this.shrink();
                    scoreTracker.multiUpdate(this.w, this.b);
                }
                return;
            }
        }
    });
};

module.exports = Player;

},{"./Audio/pickup":6,"./collision":14,"./input":17}],39:[function(require,module,exports){
var canvas          = require("./canvas");
var getStorage      = require("./storage").getStorage;
var toTenths        = require("./numstring").toTenths;

var scoreTracker = {

    score: 0,
    multiplier: 1,
    timeRemaining: 0,
    timeBonus: 0,
    total: 0,
    grandTotal: 0,
    hiScore: 0,

    storage: getStorage(),
    hiScores: null
};

scoreTracker.getHiScores = function(scenes) {
    "use strict";

    var hiScores = scenes.map(scene => {
        return [scene.name, scene.defaultScore];
    });

    if (this.storage) {

        if (!this.storage.getItem("hiScores")) {
            this.storage.setItem("hiScores", JSON.stringify(hiScores));
        } else {
            hiScores = JSON.parse(this.storage.getItem("hiScores"));
        }
    } 
    this.hiScores = hiScores;
};

scoreTracker.setHiScore = function(sceneName) {
    "use strict";
    this.hiScore = this.hiScores.find(entry => {
        return entry[0] === sceneName;
    })[1];
};

scoreTracker.timeUpdate = function(delta) {
    "use strict";

    if (this.timeRemaining > 0) {
        this.timeRemaining -= delta / 1000;
    }
};

scoreTracker.displayTime = function() {
    "use strict";

    if (this.timeRemaining <= 0) {
        return "0.0";
    } else {
        return toTenths(this.timeRemaining);
    }
};

scoreTracker.displayMulti = function() {
    "use strict";

    return toTenths(this.multiplier);
};

scoreTracker.scoreInc = function(n) {
    "use strict";

    this.score += n * this.multiplier;
};

scoreTracker.multiUpdate = function(w, b) {
    "use strict";

    // Every method is universal except this one.
    if (w >= b * 3) {
        this.multiplier = 2;
    } else if (w >= b * 2) {
        this.multiplier = 1.5;
    } else if (w >= b) {
        this.multiplier = 1;
    } else {
        this.multiplier = 0.5;
    }
};

scoreTracker.reset = function() {
    "use strict";

    this.score = 0;
    this.multiplier = 1;
    this.timeRemaining = 0;
    this.timeBonus = 0;
    this.total = 0;
};

scoreTracker.setNewHiScore = function(sceneName) {
    "use strict";
    var sceneRef;

    sceneRef = this.hiScores.find(scene => {
        return scene[0] === sceneName;
    });
    sceneRef[1] = this.total;

    if (this.storage) {
        this.updateStorage();
    }
};

scoreTracker.updateStorage = function() {
    "use strict";

    this.storage.removeItem("hiScores");
    this.storage.setItem("hiScores", JSON.stringify(this.hiScores));
};

scoreTracker.tabulate = function(sceneName) {
    "use strict";

    // Total up scores
    this.timeRemaining = toTenths(this.timeRemaining);
    this.timeBonus = this.timeRemaining * 25 * this.multiplier;
    this.total = this.score + this.timeBonus;
    this.grandTotal += this.total;

    if (this.total > this.hiScore) {
        this.setNewHiScore(sceneName);
    }

    // Positioning properties
    this.xC = canvas.width / 2;
    this.yC = canvas.height / 2;
    this.rectW = 336;
    this.rectH = 252;
    this.rectX = this.xC - this.rectW / 2;
    this.rectY = this.yC - this.rectH / 2;
    this.tXL = this.xC - 144;
    this.tXR = this.xC + 144;
    this.tYT = this.yC - 84;
    this.lineHeight = 36;

    this.fields = [
        ["Score", this.score],
        ["Time", this.timeRemaining],
        ["Multiplier", toTenths(this.multiplier)],
        ["Time Bonus", toTenths(this.timeBonus)],
        ["Total", this.total],
        ["Grand Total", this.grandTotal]
    ];
};

scoreTracker.draw = function(color) {
    "use strict";

    var ctx = canvas.ctx;

    ctx.save();

    ctx.fillStyle = color;
    ctx.fillRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.font = "24px monospace";
    ctx.fillStyle = "white";

    this.fields.forEach((field, i) => {
        ctx.textAlign = "left";
        ctx.fillText(field[0], this.tXL, this.tYT + i * this.lineHeight);
        ctx.textAlign = "right";
        ctx.fillText(field[1], this.tXR, this.tYT + i * this.lineHeight);
    });

    ctx.restore();
};

module.exports = scoreTracker;

},{"./canvas":13,"./numstring":36,"./storage":40}],40:[function(require,module,exports){
function storageAvailable(storageType) {
    "use strict";

    try {
        var storage = storageType,
            x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

exports.getStorage = function() {
    "use strict";
    var storage;

    if (storageAvailable(localStorage)) {
        storage = localStorage;

    } else if (storageAvailable(sessionStorage)) {
        storage = sessionStorage;
    }
    return storage;
};

},{}],41:[function(require,module,exports){
module.exports = {
    previous: 0,
    delta: 0,

    progress: function(tStamp) {
        "use strict";

        if (!this.previous) {
            this.previous = tStamp;
            return;
        }

        this.delta = tStamp - this.previous;
        this.previous = tStamp;
    }
};

},{}]},{},[26]);
