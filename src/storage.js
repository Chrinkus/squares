// Storage tests
//
// Could probably abstract this a bunch later

var hiScores, defaultHiScores, storage;

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

function setDefaultHiScores(scenes) {
    var defaultHiScores = {};

    scenes.forEach(scene => {
        defaultHiScores[scene.name] = scene.hiScore;
    });

    return defaultHiScores;
}

if (storageAvailable(localStorage)) {
    
    storage = localStorage;

} else if (storageAvailable(sessionStorage)) {

    storage = sessionStorage;
}

if (storage) {

    if (!storage.getItem("hiScores")) {
        storage.setItem("hiScores", JSON.stringify(defaultHiScores));
    } else {
        hiScores = JSON.parse(storage.getItem("hiScores"));
    }

} else {

    hiScores = defaultHiScores;     // not yet available
}
