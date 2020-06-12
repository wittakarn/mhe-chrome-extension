'use strict';

chrome.runtime.onInstalled.addListener(function () {
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      css: ["html"]
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});