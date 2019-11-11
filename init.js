chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ list: [{title:"Later", url:"https://github.com/EatNug/Later", isRead:false, tags:["developer"], id:0}] }, function() {
    console.log("list is set to initial state.");
  });
});
  