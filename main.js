var app = require("./app");

(function() {
    "use strict";

    var canvas = require("./canvas");

    var main = function(tStamp) {

        app.stopMain = window.requestAnimationFrame(main);

        app.render(canvas);

        app.update(tStamp);
    };

    main();

}());
