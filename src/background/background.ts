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

import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config";
import { Prompt } from "../prompt/prompt";
import { Block } from "../types/Block";
import { CreatePrompt } from "./CreatePrompt";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY});
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {  
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: requestPrompt,
        },
      ],
    });

    console.log(completion.choices[0].message.content);



    sendResponse({result: "Failed", message: "Any Block does not exist in field"})



  }
  return true;
});


