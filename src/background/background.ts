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

import { Prompt } from "../prompt/prompt";
import { Block } from "../types/Block";
import { CreatePrompt } from "./createPrompt";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {  
  if (message.action === "codeBlocks") {
    console.log(message.content as Block[][])
    const blocks: Block[][] = message.content
    const code = CreatePrompt(blocks[0])
    const quiz: string = message.quiz

    if(quiz.length === 0){
      sendResponse({
        result: "Failed",
        message: "Please Quiz Page",
      });
      return true
    }

    const requestPrompt = Prompt.replace("<program>", code).replace("<quiz>", quiz);



    sendResponse({result: "Failed", message: "Any Block does not exist in field"})



  }
  return true;
});


