  
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ list: [{title:"Later", url:"https://github.com/EatNug/Later", isRead:false, tags:["developer"], id:0}] }, function() {
    console.log("list is set to initial state.");
  });
});


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "toggle" });
  });
});
