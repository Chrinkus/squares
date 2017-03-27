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
