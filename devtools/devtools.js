function handleShown() {
    console.log("panel is being shown.");
}

function handleHidden() {
    console.log("panel is being hidden.");
}

browser.devtools.panels.create(
    "Meleak Panel",
    "/icons/memory-leak-detector-32.png",
    "/devtools/panel/panel.html"
).then((newPanel) => {
    newPanel.onShown.addListener(handleShown);
    newPanel.onHidden.addListener(handleHidden);
});