chrome.storage.sync.get(["extensionMheStorage"], function (items) {
  if (items["extensionMheStorage"]) {
    const storage = items["extensionMheStorage"];

    if (storage.state.processing && storage.commands)
      for (command of storage.commands) {
        if (!command.selector) continue;

        const elementSelectors = document.querySelectorAll(command.selector);
        if (elementSelectors) {
          for (elementSelector of elementSelectors) {
            if (!elementSelector) continue;
            elementSelector.setAttribute('style', command.styling);
          }
        }
      }
  }
});
