const save = document.getElementById("button__save");
const saveWT = document.getElementById("button__saveWT");
const load = document.getElementById("button__load");
const bookmarks__container = document.getElementById("bookmarks__container");
const q = document.getElementById("search__box");
const search = document.getElementById("button__search");

const makeElem = item => {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const tags = document.createElement("p");
  div.classList.add("bookmark");
  title.appendChild(document.createTextNode(item.title));
  title.classList.add("bookmark__title");
  tags.appendChild(document.createTextNode(item.tags.length ? item.tags : " "));
  tags.classList.add("bookmark__tags");
  div.appendChild(title);
  div.appendChild(tags);
  div.onclick = () => chrome.tabs.create({ url: item.url });
  return div;
};

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["list"], items => {
    items.list.forEach(cur => bookmarks__container.appendChild(makeElem(cur)));
  });
});

save.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.storage.sync.get(["list"], items => {
      if (!items.list.filter(cur => cur.url === tabs[0].url).length) {
        chrome.storage.sync.set({ list: [...items.list, { title: tabs[0].title, url: tabs[0].url, isRead: false, tags: [] }] });
        location.href = "";
      }
    });
  });
};

saveWT.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.storage.sync.get(["list"], items => {
      if (!items.list.filter(cur => cur.url === tabs[0].url).length) {
        const tags = prompt("태그를 입력하세요. ex)태그1,태그2").split(",");
        chrome.storage.sync.set({ list: [...items.list, { title: tabs[0].title, url: tabs[0].url, isRead: false, tags }] });
        location.href = "";
      }
    });
  });
};

load.onclick = () => {
  chrome.storage.sync.get(["list"], items => {
    console.log(items);
  });
};

search.onclick = () => {
  if (q.value) {
    const re = new RegExp(q.value, "i");
    bookmarks__container.innerHTML = "";
    chrome.storage.sync.get(["list"], items => {
      items.list.filter(cur => cur.title.match(re) || cur.tags.filter(_cur => _cur.match(re)).length).forEach(cur => bookmarks__container.appendChild(makeElem(cur)));
    });
  }
};
