chrome.storage.sync.get(["extensionCommands"], function (items) {
  if (items["extensionCommands"]) {
    const commands = JSON.parse(items['extensionCommands']);
    for (command of commands) {
      const elementSelectors = document.querySelectorAll(command.selector);
      if (elementSelectors) {
        for (elementSelector of elementSelectors) {
          if (elementSelector) {
            elementSelector.setAttribute('style', command.styling);
          }
        }
      }
    }
  }
});
