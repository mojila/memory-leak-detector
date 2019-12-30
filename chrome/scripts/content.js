chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      let memoryUsed = performance.memory.usedJSHeapSize;
      let memoryHeapTotal = performance.memory.totalJSHeapSize;
      if (request.greeting == "hello")
        sendResponse({farewell: { memoryUsed, memoryHeapTotal }});
    });