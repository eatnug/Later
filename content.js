chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.type == "save") {
    console.log(msg.data);
    const data = {}
    data[count] = msg.data
    count += 1
    chrome.storage.sync.set(data);
  } else if (msg.type == "load")
    chrome.storage.sync.get(null, function(item) {
      console.log(item);
    });
});
