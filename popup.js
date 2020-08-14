const commandList = document.getElementById('command-list');
const addCommandButton = document.getElementById('addCommand');
const removeCommandButton = document.getElementById('removeCommand');
const saveButton = document.getElementById('save');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

window.onload = function () {
    chrome.storage.sync.get(['extensionMheStorage'], function (items) {
        if (items['extensionMheStorage']) {
            const storage = items['extensionMheStorage'];

            if (storage.commands) {
                for (command of storage.commands) {
                    commandList.appendChild(generateInput(command.selector, command.styling));
                }

                if (storage.commands.length > 0) {
                    startButton.style.display = storage.state.processing ? 'none' : 'inline';
                    stopButton.style.display = storage.state.processing ? 'inline' : 'none';
                }
            }
        }
    });
}

addCommandButton.onclick = function () {
    commandList.appendChild(generateInput('', ''));
};

removeCommandButton.onclick = function () {
    commandList.removeChild(commandList.lastChild);
};

saveButton.onclick = function () {
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
    updateExtensionStorage({ commands: commandList, state: { processing: true } });

    chrome.tabs.executeScript(null, {
        file: 'content_script.js'
    });
};

startButton.onclick = () => {
    updateExtensionStorage({ state: { processing: true } });

    chrome.tabs.executeScript(null, {
        file: 'content_script.js'
    });

    startButton.style.display = 'none';
    stopButton.style.display = 'inline';
};

stopButton.onclick = () => {
    updateExtensionStorage({ state: { processing: false } });

    startButton.style.display = 'inline';
    stopButton.style.display = 'none';
};

function updateExtensionStorage(value) {
    chrome.storage.sync.get(['extensionMheStorage'], function (items) {
        chrome.storage.sync.set(
            {
                'extensionMheStorage': {
                    ...(items['extensionMheStorage'] ? items['extensionMheStorage'] : {}),
                    ...value
                }
            },
            () => { }
        );
    });
}

function generateInput(selector, styling) {
    const row = document.createElement('tr');
    row.innerHTML = '<tr><td><input type="text" name="selector" value="' + selector + '"/></td><td><input type="text" name="styling" value="' + styling + '"/></td></tr>';
    return row;
}