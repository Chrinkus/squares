// Scene constructor
//
// Should consist of basic containers for assets

function Scene() {
    "use strict";

    this.objectives = {};
    this.backgrounds = [];
    this.actors = [];
    this.messages = [];
}

function Background(color, width, height) {
    "use strict";

    this.color = color;
    this.width = width;
    this.height = height;

    this.path = function() {
        var path = new Path2D();
        path.rect(0, 0, this.width, this.height);
        return path;
    };
}

// What a "Scene" needs
//
// A Scene object can be a level in a game or a menu screen. Both can have 
// backgrounds and messages, game levels will have actors as well.
// 
// ** Menus MAY have actors - as the cursor accepts user input, perhaps the 
// ** cursor may be based on the player object(?)
// 
// Perhaps the best attempt would be to create a menu screen based off of my
// previous work in the Next project.

var mainMenu = new Scene();

mainMenu.objectives = null;

mainMenu.backgrounds[0] = new Background("green", canvas.width, canvas.height);
