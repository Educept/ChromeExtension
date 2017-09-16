function saveState(status, uid) {
  const items = {};
  items['status'] =  status;
  items['uid'] = uid;
  chrome.storage.sync.set(items);
}

function getStatus(callback) {
  chrome.storage.sync.get('status', (items) => {
    callback(chrome.runtime.lastError ? null : items['status']);
  });
}

function getUID(callback) {
  chrome.storage.sync.get('uid', (items) => {
    callback(chrome.runtime.lastError ? null : items['uid']);
  });
}