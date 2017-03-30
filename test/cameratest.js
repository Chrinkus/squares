var Camera          = require("../src/camera");

var badCamUndefined,
    badCamStringNums,
    badCamArray,
    badCamObj;

try {
    badCamUndefined = new Camera();
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamStringNums = new Camera("300", "450");
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamArray = new Camera([255, 127]);
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}

try {
    badCamObj = new Camera({ mapW: 1000, mapH: 700 });
} catch(e) {
    console.log("Bad Camera Failed: " + e.message);
}
