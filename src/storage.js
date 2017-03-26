function storageAvailable(storageType) {
    "use strict";

    try {
        var storage = storageType,
            x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

exports.getStorage = function() {
    "use strict";
    var storage;

    if (storageAvailable(localStorage)) {
        storage = localStorage;

    } else if (storageAvailable(sessionStorage)) {
        storage = sessionStorage;
    }
    return storage;
};
