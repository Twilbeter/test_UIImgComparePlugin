chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var switchKey = tabs[0].id + '_Switch';
  var storageObj = {};
  storageObj[switchKey] = false;
  chrome.storage.sync.get(storageObj, function (values) {
    document.getElementById('switch').checked = values[switchKey];
    console.log('switch init:', switchKey, values[switchKey]);
  });
});


function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, function (response) {
    if (!window.chrome.runtime.lastError) {
      console.log('message form content:', tabId, response);
    }
  });
}

document.getElementById('switch').addEventListener('change', function (event) {
  const value = event.target.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    if (value) {
      sendMessageToContentScript(tabId, { cmd: 'enable' });
    } else {
      sendMessageToContentScript(tabId, { cmd: 'reduction' });
    }
    var switchKey = tabId + '_Switch';
    var storageObj = {};
    storageObj[switchKey] = value;
    chrome.storage.sync.set(storageObj, function () {
      console.log('switch change:', switchKey, value);
    });
  });
});
