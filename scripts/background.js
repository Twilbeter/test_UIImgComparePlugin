// 安装完成
// chrome.runtime.onInstalled.addListener(() => {});

// 页面更新
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status !== 'complete') return;
// })

// function sendMessageToContentScript(message) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
//       console.log('message form content:', response);
//     });
//   });
// }

// // 启用页面
// function enable () {
//   sendMessageToContentScript({ cmd: 'enable' });
// }

// // 通知还原页面
// function reduction () {
//   sendMessageToContentScript({ cmd: 'reduction' });
// }

// popup.js
// var bg = chrome.extension.getBackgroundPage();
//  bg.enable();
//  bg.reduction(); 