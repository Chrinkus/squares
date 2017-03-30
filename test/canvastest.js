var canvas          = require("../src/canvas");

console.log("Canvas tests");
console.log("width is number:", typeof canvas.width === "number");
console.log("height is number:", typeof canvas.height === "number");
console.log("ctx is object:", typeof canvas.ctx === "object");
