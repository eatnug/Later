const save = document.getElementById("button__save");
const load = document.getElementById("button__load");

save.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.storage.sync.get(["list"], items => {
      if (!items.list.filter(cur => cur.url === tabs[0].url).length) chrome.storage.sync.set({ list: [...items.list, { title: tabs[0].title, url: tabs[0].url, isRead: false }] });
    });
  });
};

load.onclick = () => {
  chrome.storage.sync.get(["list"], items => {
    console.log(items);
  });
};
