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


// OPENAI APIを叩く

import { Block } from "../types/Block";
import { CreatePrompt } from "./createPrompt";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "codeBlocks") {
    console.log(message.content as Block[][])
    const blocks: Block[][] = message.content
    CreatePrompt(blocks[0])
    sendResponse({result: "Failed", message: "Any Block does not exist in field"})



  }
  return true;
});


