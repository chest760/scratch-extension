import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BlockEnum } from "../../enum/Block";
import { Block, BlockType } from "../../types/Block";
import { CategoryType } from "../../types/Category";
import { Cover } from "../background/cover";
import { EvaluationPopup } from "../popup/EvaluationPopup";

export const CodeSubmit = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [submittedBlock, setsubmittedBlock] = useState<Block[][]>([]);
  const [, setElementNum] = useState<number>(0)
  const sleep = (time: number) => new Promise((r) => setTimeout(r, time));

  const isPointerDownRef = useRef(isPointerDown);
  const selectedBlockRef = useRef(selectedBlock);

  useEffect(() => {
    isPointerDownRef.current = isPointerDown;
  }, [isPointerDown]);

  useEffect(() => {
    selectedBlockRef.current = selectedBlock;
  }, [selectedBlock]);

  useLayoutEffect(() => {
    const attach = async () => {
      await sleep(1500);
      document.querySelector(".controlundo")?.remove();
      CategorySelector();
      AttachedId("Motion");
      setIsMount(true)
    };
    attach();
  }, []);

  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if(message.action === "quiz"){
      console.log(message)
      setCurrentPage(message.currentPage)
      setQuiz(message.quiz)
      sendResponse("SET QUIZ")
    }
    return true
  })

  const thumbObserver = new MutationObserver(() => {
    setElementNum(0)
  })

  const spritecc = document.querySelector(".spritecc");
  if (spritecc)
    thumbObserver.observe(spritecc, {
      childList: true,
      attributes: false,
      subtree: false,
    });


  const blockObserver = new MutationObserver((mutationList,) => {
    const num = (mutationList[0].target as Element).querySelectorAll(":scope > div").length;
    if ((mutationList[0].target as Element).querySelectorAll(":scope > div:last-child")[0].querySelectorAll("canvas").length < 4) return
    setElementNum((prev) => {
      if (prev < num) {
        const blocks: NodeListOf<HTMLDivElement> | undefined = (mutationList[0].target as Element).querySelectorAll(":scope > div")
        blocks.forEach((block)=>{
          if(!block.id){
            block.setAttribute("id", selectedBlockRef.current);
          }
        })
          return num;
        } else {
          return prev;
        }
      });
  })
    
  const leave = () => {
    let container: HTMLDivElement | undefined = undefined;
    if (isPointerDownRef.current) {
      const containers: NodeListOf<HTMLDivElement> | undefined = document.querySelectorAll(".look");
      for(const div of containers){
          if(div.style.visibility === "visible"){
            container = div
          }
      }
      if (container)
        blockObserver.observe(container, {
          childList: true,
          attributes: false,
          subtree: false,
      });
      setIsPointerDown(false);
    }
  };

  const CategorySelector = () => {
    const Categoryes: CategoryType[] = [
      "Start", "Motion", "Looks", "Sound", "Flow", "Stop",
    ];
    const categorySelectors: NodeListOf<HTMLDivElement> | undefined = document.querySelector(".categoryselector")?.querySelectorAll(":scope > div:not(.catbkg)");
    if(!categorySelectors) return
    categorySelectors.forEach((categorySelector: HTMLDivElement, index: number) => {
      categorySelector.addEventListener("click", function() {
        AttachedId(Categoryes[index])
      })
    }); 
  };

  const AttachedId = (selectedCategory: CategoryType) => {
    console.log(selectedCategory)
    const palette = document.querySelector(".palette");
    const blocks: NodeListOf<HTMLDivElement> | undefined =
      palette?.querySelectorAll(":scope > div");
    blocks?.forEach((block: HTMLDivElement, index: number) => {
      block.setAttribute("id", selectedCategory + "_" + index.toString());
      const canvases = block.querySelectorAll("canvas");
      canvases.forEach((canvas) => {
        canvas.setAttribute("id", selectedCategory + "_" + index.toString());
        canvas.addEventListener("pointerdown", function (e: MouseEvent) {
          setIsPointerDown(true);
          const target = e.target as HTMLCanvasElement;
          setSelectedBlock(target.id);
        });
        canvas.addEventListener("pointerup", function () {
          setIsPointerDown(false);
        });
        canvas.addEventListener("pointermove", leave);
      });
    });
  };

  const handleRpeat = (blocks: Block[]): [Block[], number] => {
    const repeatStart = blocks[0].x;
    const repeatEnd = blocks[0].x + blocks[0].width - 110;
    const repeatBlocks: Block[] = [];
    let i = 1;
    while (i < blocks.length) {
      if (repeatStart < blocks[i].x && blocks[i].x < repeatEnd) {
        if (blocks[i].type == "REPEAT") {
          const [nestRepeatBlocks, num] = handleRpeat(blocks.slice(i));
          blocks[i].loop = nestRepeatBlocks;
          repeatBlocks.push(blocks[i]);
          i += num;
        } else {
          repeatBlocks.push(blocks[i]);
          i++;
        }
      } else {
        break;
      }
    }
    return [repeatBlocks, i];
  };

  
  const onSubmit = () => {
    setIsSubmitted(true);

    const containers: NodeListOf<HTMLDivElement> | undefined = document.querySelectorAll(".look");    
    for(const container of containers){
      const blocks: NodeListOf<HTMLDivElement> | undefined = container?.querySelectorAll(":scope > div");
      if (!blocks) return;
      const validBlocks = Array.from(blocks).filter((block: HTMLDivElement) => {
        return block.style.visibility !== "hidden";
      });

      const regex =
        /translate3d\((\d+\.{0,1}\d*)px, (\d+\.{0,1}\d*)px, (\d+\.{0,1}\d*)px\)/;
      const wisthRegex = /(\d+)px/;

      const tmp: Block[] = [];
      for (const validBlock of validBlocks) {
        let number = 1;
        const transform = regex.exec(validBlock.style.transform);
        const width = wisthRegex.exec(validBlock.style.width);
        if (!width) return;
        const motionNum = validBlock.querySelector("div");
        if (motionNum) {
          number = Number(motionNum.textContent);
          if (isNaN(number)) {
            number = 1;
          }
        }
        if (transform) {
          const [x, y] = [transform[1], transform[2]];
          const motion = motionMapping(validBlock.id);
          if (!motion) {
            alert("再リロードしてください");
            setIsGenerating(false);
            setIsSubmitted(false);
            return;
          }
          tmp.push({
            x: Number(x),
            y: Number(y),
            width: Number(width[1]),
            type: motion,
            num: number,
            loop: [],
          });
        }
      }
      tmp.sort((a, b) => a.x - b.x);

      const blockArray: Block[] = [];
      let i = 0;
      while (i < tmp.length) {
        if (tmp[i].type == "REPEAT") {
          const [repeatBlock, num] = handleRpeat(tmp.slice(i));
          tmp[i].loop = repeatBlock;
          blockArray.push(tmp[i]);
          i += num;
        } else {
          blockArray.push(tmp[i]);
          i++;
        }
      }

      if (blockArray.length === 0) {
        alert("Any Block does not exist in field");
        setIsGenerating(false);
        setIsSubmitted(false);
        return;
      }

      setsubmittedBlock([...submittedBlock, blockArray])
    }
  };

  const motionMapping = (motion: string): BlockType | undefined => {
    switch (motion) {
      case "Motion_0":
        return BlockEnum.MOTION_0;
      case "Motion_1":
        return BlockEnum.MOTION_1;
      case "Motion_2":
        return BlockEnum.MOTION_2;
      case "Motion_3":
        return BlockEnum.MOTION_3;
      case "Motion_4":
        return BlockEnum.MOTION_4;
      case "Motion_5":
        return BlockEnum.MOTION_5;
      case "Motion_6":
        return BlockEnum.MOTION_6;
      case "Motion_7":
        return BlockEnum.MOTION_7;
      case "Start_0":
        return BlockEnum.START_0;
      case "Start_1":
        return BlockEnum.START_1;
      case "Start_2":
        return BlockEnum.START_2;
      case "Start_3":
        return BlockEnum.START_3;
      case "Start_4":
        return BlockEnum.START_4;
      case "Looks_0":
        return BlockEnum.LOOKS_0;
      case "Looks_1":
        return BlockEnum.LOOKS_1;
      case "Looks_2":
        return BlockEnum.LOOKS_2;
      case "Looks_3":
        return BlockEnum.LOOKS_3;
      case "Looks_4":
        return BlockEnum.LOOKS_4;
      case "Looks_5":
        return BlockEnum.LOOKS_5;
      case "Sound_0":
        return BlockEnum.SOUND_0;
      case "Flow_0":
        return BlockEnum.FLOW_0;
      case "Flow_1":
        return BlockEnum.FLOW_1;
      case "Flow_2":
        return BlockEnum.FLOW_2;
      case "Flow_3":
        return BlockEnum.FLOW_3;
      case "Stop_0":
        return BlockEnum.STOP_0;
      case "Stop_1":
        return BlockEnum.STOP_1
    }

  }

  return (
    <>
      <button
        style={{
          position: "absolute",
          bottom: "30px",
          right: "20px",
          padding: "10px 30px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#00e0ff",
          color: "white",
          borderBottom: "solid 5px #00aacc",
          borderRight: "none",
          borderColor: "#00e0ff",
        }}
        onClick={onSubmit}
      >
        Submit
      </button>

      {isGenerating ? <Cover color="primary" /> : <></>}

      {isMount ? <></> : <Cover color="success" />}

      {/* {!isGenerating && isSubmitted ? } */}

      { isSubmitted ?
        <EvaluationPopup
          quiz={quiz}
          currentPage = {currentPage}
          setIsSubmitted={setIsSubmitted}
          setIsGenerating={setIsGenerating}
          submittedBlock={submittedBlock}
        />
        :<></>
      }
    </>
  );
}