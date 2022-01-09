var AllStyle = document.createElement('style');
AllStyle.innerHTML = '.ui_compare_ui_img__FGR56J { position: absolute; z-index: -1; }.ui_compare_img_drag_btn_FGR56J { position: absolute; margin-top: -10px; margin-left: -10px; width: 20px; height: 20px; background-color: rgba(255, 0, 0, 0.5) !important; cursor: move; z-index: 999999; }';
document.body.appendChild(AllStyle);

var StyleDom = document.createElement('style');
StyleDom.innerHTML = '*{background-color: transparent !important;}';
var enablePaste;
var UIImage;
var DragDom;
var DragDomMove;
var clientX = 0;
var clientY = 0;

function onMouseDown (e) {
  DragDomMove = true;
  //获取x坐标和y坐标
  clientX = e.clientX;
  clientY = e.clientY;
}
function onMouseMove(e) {
  if (!DragDomMove) {
    return;
  }
  var nowX = e.clientX;
  var nowY = e.clientY;
  var nowTop = nowY - clientY + parseInt(DragDom.style.top);
  var nowLeft = nowX - clientX + parseInt(DragDom.style.left);
  DragDom.style = 'top:' + nowTop + 'px;' + 'left:' + nowLeft + 'px';
  UIImage.style = 'top:' + (nowTop - UIImage.height / 2) + 'px;' + 'left:' + (nowLeft - UIImage.width / 2) + 'px';
  clientX = nowX;
  clientY = nowY;
}
function onMouseUp(e) {
  DragDomMove = false;
}


document.addEventListener('paste', function (event) {
  if (!enablePaste) return;
  console.log('paste', event);
  var items = event.clipboardData?.items || event.originalEvent?.clipboardData?.items;
  if (items &&items[0].type.indexOf('image') > -1) {
    var file = items[0].getAsFile();
    var blobUrl = URL.createObjectURL(file);
    document.body.appendChild(StyleDom);
    UIImage = document.createElement('img');
    UIImage.src = blobUrl;
    UIImage.className = 'ui_compare_ui_img__FGR56J';
    UIImage.style = 'top: 0; left: 0;';
    document.body.insertBefore(UIImage, document.body.firstChild);
    setTimeout(function () {
      var width = UIImage.width;
      var height = UIImage.height;
      DragDom = document.createElement('div');
      DragDom.className = 'ui_compare_img_drag_btn_FGR56J';
      DragDom.style = ' top: ' + (height / 2) + 'px; left: ' + (width / 2) + 'px;'
      document.body.appendChild(DragDom);
      DragDom.addEventListener('mousedown', onMouseDown);
      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);
    }, 50);
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == 'enable') {
    enablePaste = true;
  } else if (request.cmd == 'reduction') {
    enablePaste = false;
    document.body.removeChild(StyleDom);
    document.body.removeChild(UIImage);
    document.body.removeChild(DragDom);
    DragDom.removeEventListener('mousedown', onMouseDown);
    document.body.removeEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
  }
  sendResponse(request.cmd);
});

window.addEventListener('beforeunload', function () {
  // 刷新/关闭页面则关闭插件
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var switchKey = tabs[0].id + '_Switch';
    var storageObj = {};
    storageObj[switchKey] = false;
    chrome.storage.sync.set(storageObj, function (values) {
      console.log('switch init:', switchKey, values[switchKey]);
    });
  });
});

