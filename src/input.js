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
