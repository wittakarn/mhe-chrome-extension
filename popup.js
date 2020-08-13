const commandList = document.getElementById('command-list');
const addCommandButton = document.getElementById('addCommand');
const removeCommandButton = document.getElementById('removeCommand');
const confirmButton = document.getElementById('confirm');

window.onload = function () {
    chrome.storage.sync.get(['extensionCommands'], function (items) {
        if (items['extensionCommands']) {
            const commands = JSON.parse(items['extensionCommands']);

            for(command of commands) {
                commandList.appendChild(generateInput(command.selector, command.styling));
            }
        }
    });
}

confirmButton.onclick = function () {
    const selectors = document.getElementsByName('selector');
    const styles = document.getElementsByName('styling');

    const commandList = Array.prototype.map.call(selectors,
        (selector, index) => (
            {
                selector: selector.value,
                styling: styles[index].value
            }
        )
    );
    updateSelectorStyle(JSON.stringify(commandList));

    chrome.tabs.executeScript(null, {
        file: 'content_script.js'
    });
};

addCommandButton.onclick = function () {
    commandList.appendChild(generateInput('', ''));
};

removeCommandButton.onclick = function () {
    commandList.removeChild(commandList.lastChild);
};

function updateSelectorStyle(value) {
    chrome.storage.sync.set({ 'extensionCommands': value }, function () {
        //  A data saved callback omg so fancy
    });
}

function generateInput(selector, styling) {
    const row = document.createElement('tr');
    row.innerHTML = '<tr><td><input type="text" name="selector" value="' + selector + '"/></td><td><input type="text" name="styling" value="' + styling + '"/></td></tr>';
    return row;
}