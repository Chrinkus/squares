// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Part - Rhythm or Voice
// 
// Properties
//   Part.name      {String}    "lead", "kick"
//   Part.sound     {Object}    containing audioGraph
//   Part.schedule  {Array}     of data objects {when:, freq:, dur:}
//   Part.played    {Array}     of already played schedule objects
//   Part.loopStart {Number}    context loop start time
//   Part.loopTime  {Number}    seconds long
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Part(name) {
    "use strict";
    this.name = name;
    this.sound = null;
    this.schedule = [];
    this.played = [];
    this.loopStart = 0;
    this.loopTime = 0;
}

Part.prototype = Object.create(null);       // in case of for-in

Part.prototype.queue = function(offset) {
    "use strict";
    this.sound.play(this.schedule[0], offset);
    this.schedule.push(this.schedule.shift());
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Part;
}
