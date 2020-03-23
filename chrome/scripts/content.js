chrome.runtime.onMessage.addListener(
    function(request, _sender, sendResponse) {
      let memoryUsed = performance.memory.usedJSHeapSize;
      let memoryHeapTotal = performance.memory.totalJSHeapSize;
      
      if (request.content == "get_info")
        sendResponse({memoryInfo: { memoryUsed, memoryHeapTotal }});
    });