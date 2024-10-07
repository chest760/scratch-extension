const TARGET_URL = "https://codejr.org/scratchjr/index.html";


chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes(TARGET_URL)) {
      chrome.sidePanel.setOptions({
        tabId: activeInfo.tabId,
        path: "src/sidepanel/index.html",
        enabled: true,
      });
    } else {
      chrome.sidePanel.setOptions({
        tabId: activeInfo.tabId,
        enabled: false,
      });
    }
  });
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

