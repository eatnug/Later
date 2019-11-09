let count = 0;
document.addEventListener(
  "DOMContentLoaded",
  function() {
    document.getElementById("save").addEventListener(
      "click",
      () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const title = prompt('제목')
            chrome.tabs.sendMessage(tabs[0].id, {type:"save",data:{title, url:tabs[0].url}});
          });
      },
      false
    );
    document.getElementById("load").addEventListener(
      "click",
      () => {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { type: "load" });
        });
      },
      false
    );
  },
  false
);
