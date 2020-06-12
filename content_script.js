chrome.storage.sync.get(["extensionRemoveElementSelector"], function (items) {
  if (items["extensionRemoveElementSelector"]) {
    const removeElement = document.querySelector(items["extensionRemoveElementSelector"]);
    const parentOfTheRemoveElement = removeElement.parentNode;
    parentOfTheRemoveElement.removeChild(removeElement);
  }
});
