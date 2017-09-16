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