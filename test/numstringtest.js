var numstring       = require("../src/numstring");

console.log("Appends decimal zero:", numstring.toTenths(1) === "1.0");
console.log("Displays negative val:", numstring.toTenths(-3.2) === "-3.2");
console.log("Truncates extra digits:", numstring.toTenths(0.002) === "0.0");
