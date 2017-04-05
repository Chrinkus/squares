// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Part - Rhythm or Voice
// 
// name = string = "lead", "kick"
// sound = object containing audioGraph
// schedule = array of objects
// - voice objs => freq, dur, when
// - rhythm objs => when
// played = array of already played schedule objects
// zeroRef = audio context loop start time
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Part(name) {
    "use strict";
    this.name = name;
    this.sound = null;
    this.schedule = [];
    this.played = [];
    this.zeroRef = 0;
}

Part.prototype = Object.create(null);       // in case of for-in

Part.prototype.queue = function() {
    this.sound.play(this.schedule[0]);
    this.played.push(this.schedule.shift());
};

Part.prototype.reset = function() {
    this.schedule = this.played.slice();
    this.played = [];
};
