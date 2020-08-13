chrome.storage.sync.get(["extensionCommands"], function (items) {
  if (items["extensionCommands"]) {
    const commands = JSON.parse(items['extensionCommands']);
    for (command of commands) {
      document.querySelector(command.selector).setAttribute('style', command.styling);
    }
  }
});
