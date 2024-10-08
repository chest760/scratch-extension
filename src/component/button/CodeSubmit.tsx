import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BlockEnum } from "../../enum/Block";
import { Block, BlockType } from "../../types/Block";
import { CategoryType } from "../../types/Category";

export const CodeSubmit = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [elementNum, setElementNum] = useState<number>(0)
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
      document.querySelector(".controlundo")?.remove();
      await sleep(1000);

      CategorySelector();
      AttachedId("Motion");
    };
    attach();
  }, []);


    const observer = new MutationObserver((mutationList, observer) => {
      const num = (mutationList[0].target as Element).querySelectorAll(
        ":scope > div"
      ).length;
      if (
        (mutationList[0].target as Element)
          .querySelectorAll(":scope > div:last-child")[0]
          .querySelectorAll("canvas").length < 4
      )
        return
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
      if (isPointerDownRef.current) {
        const container = document.querySelector(".look");
        if (container)
          observer.observe(container, {
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


  const onSubmit = () => {
    const container = document.querySelector(".look");
    const blocks: NodeListOf<HTMLDivElement> | undefined =
      container?.querySelectorAll(":scope > div");
    if(!blocks) return
    const validBlocks = Array.from(blocks).filter((block: HTMLDivElement) => {
      return block.style.visibility !== "hidden";
    }); 

    const regex =/translate3d\((\d+\.{0,1}\d*)px, (\d+\.{0,1}\d*)px, (\d+\.{0,1}\d*)px\)/;

    const tmp: Block[] = []
    for(const validBlock of validBlocks) {
      let number = 1
      const transform = regex.exec(validBlock.style.transform);
      const motionNum = validBlock.querySelector("div")
      if(motionNum) {
        number = Number(motionNum.textContent)
        if(isNaN(number)){
          number = 1
        }
      }
      if(transform){
        const [x, y] = [transform[1], transform[2]]
        console.log(validBlock.id);
        const motion = motionMapping(validBlock.id);
        if(!motion){
            alert("再リロードしてください");
            return;
        }
        tmp.push({x: Number(x), y: Number(y), type: motion, num: number})
      }
    };
    tmp.sort((a,b)=> a.x - b.x)
    
    // const yArray = Array.from(new Set(tmp.map((block) => block.y)));
    // if (yArray.length !== 1) {
    //   if (yArray.length == 2){
    //     if(Math.abs(yArray[0] - yArray[1]) !== 16){
    //       alert("正しくブロックを並べてください");
    //     }
    //   }else{
    //       alert("正しくブロックを並べてください");
    //   }
    //   return;
    // }

    console.log(tmp)
    chrome.runtime.sendMessage(
      {action:"codeBlocks", content: tmp},
      function (response) {
        console.log(response.result);
      }
    );
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

      <button
        onClick={() => {
          console.log(selectedCategory);
        }}
        style={{ position: "absolute", top: "50px", right: "0px" }}
      >
        提出1
      </button>
    </>
  );
}