const TARGET_URL = "https://codejr.org/scratchjr/index.html";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase"

const addDocument = async(
  {prompt_output, difficulty, name}: 
  {prompt_output: string,  difficulty: string, name: string}
)=>{
  const docRef = await addDoc(collection(db, "output"), {
    prompt_output,
    difficulty,
    name
  });
  console.log("Document written with ID: ", docRef.id);

}
// Add a new document with a generated id.


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

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {  
  if (message.action === "submitDifficulty") {
    console.log(message.content as Block[][]);
    const blocks: Block[][] = message.content;
    const code = CreatePrompt(blocks.slice(-1)[0]);
    const quiz: string = message.quiz;

    if (quiz.length === 0) {
      sendResponse({
        result: "Failed",
        message: "Please Quiz Page",
      });
      return true;
    }
    var multi = 6;
    if (message.difficulty === "easy") {
      multi = 0.75;
    }else if(message.difficulty === "normal"|| message.difficulty === "cannot"){
      multi = 1;
    }else if(message.difficulty === "difficult"){
      multi = 2;
    }

    const requestPrompt = Prompt.replace("<program>", code).replace(
      "<quiz>",
      quiz
    ).replace("<multi>", String(multi));


    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: requestPrompt,
        },
      ],
    });
    console.log("SLEEP");
    console.log(requestPrompt);
    completion
      .then((value) => {
        console.log(value.choices[0].message.content);
        const name = "example"
       
        if (name === null){
          sendResponse({
          result: "Unsuccess",
          message: "Your Request was successed",
          content: value.choices[0].message.content,
        });
        }else{
          addDocument(
            {
              prompt_output: value.choices[0].message.content as string,
              difficulty: message.difficulty,
              name : name
            }
          )
          sendResponse({
            result: "Success",
            message: "Your Request was successed",
            content: value.choices[0].message.content,
          });
        }



      })
      .catch(() => {
        sendResponse({
          result: "Failed",
          message: "error in generation",
          conotent: null
        });
      });
    return true;
  }
  return true
});


