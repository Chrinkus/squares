// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Part - Rhythm or Voice
// 
// Properties
//   Part.name      {String}    "lead", "kick"
//   Part.sound     {Object}    containing audioGraph
//   Part.schedule  {Array}     of data objects {when:, freq:, dur:}
//   Part.loopTime  {Number}    seconds long
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function Part(name) {
    "use strict";
    this.name = name;
    this.sound = null;
    this.schedule = [];
    this.loopTime = 0;
    this.iterator = 0;
}

Part.prototype.queue = function(offset) {
    if (offset < 0) {
        offset += this.loopTime;
    }

    this.sound.play(offset, this.schedule[this.iterator]);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Part;
}
