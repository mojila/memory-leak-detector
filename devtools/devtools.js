console.log('Hello from devtools');

chrome.devtools.panels.create(
    "Meleak Panel",
    "icon.png",
    "panel/index.html"
);