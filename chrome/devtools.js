chrome.devtools.panels.create(
    "Meleak",
    "memory-leak-detector-32.png",
    "devtools/index.html",
    function(panel) {
        console.log('hello rendered panel');
    }
);