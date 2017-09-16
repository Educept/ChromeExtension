function saveOnOffState(status) {
  const items = {};
  items['status'] =  status;
  chrome.storage.sync.set(items);
}

function getOnOffState(callback) {
  chrome.storage.sync.get('status', (items) => {
    callback(chrome.runtime.lastError ? null : items['status']);
  });
}

function saveUID(uid) {
  const items = [];
  items['uid'] = uid;
  chrome.storage.sync.set(items);
}

function getUID(callback) {
  chrome.storage.sync.get('uid', () => {
    callback(chrome.runtime.lastError ? null : items['uid']);
  });
}