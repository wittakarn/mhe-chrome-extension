const confirmButton = document.getElementById('confirm');

window.onload = function () {
    chrome.storage.sync.get(["extensionRemoveElementSelector"], function (items) {
        if (items["extensionRemoveElementSelector"]) {
            document.getElementById('removeElement').value = items["extensionRemoveElementSelector"];
        }
    });
}

confirmButton.onclick = function (element) {

    const elementSelector = document.getElementById('removeElement').value;
    updateRemoveSelector(elementSelector);

    chrome.tabs.executeScript(null, {
        file: 'content_script.js'
    });
};

function updateRemoveSelector(value) {
    chrome.storage.sync.set({ "extensionRemoveElementSelector": value }, function () {
        //  A data saved callback omg so fancy
    });
}