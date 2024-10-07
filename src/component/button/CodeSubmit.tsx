import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BlockEnum } from "../../enum/Block";
import { Block, BlockType } from "../../types/Block";

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
    const addId = async () => {
      await sleep(1000);
      const palette = document.querySelector(".palette");
      const blocks = palette?.querySelectorAll(":scope > div");
      blocks?.forEach((block, index) => {
        const canvases = block.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          canvas.setAttribute("id", "MOTION_" + index.toString());
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
    const observer = new MutationObserver((mutationList, observer) => {
      const num = (mutationList[0].target as Element).querySelectorAll(
        ":scope > div"
      ).length;

    if((mutationList[0].target as Element).querySelectorAll(":scope > div:last-child")[0].querySelectorAll("canvas").length!== 4) return
      


      setElementNum((prev) => {
        console.log(
          mutationList
        );
        if (prev < num) {
          (mutationList[0].target as Element)
            .querySelectorAll(":scope > div:last-child")[0]
            .setAttribute("id", selectedBlockRef.current);
          return num;
        } else {
          return prev;
        }
      });
    });

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
    addId();

  }, []);


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
      }
      if(transform){
        const [x, y] = [transform[1], transform[2]]
        const motion = motionMapping(validBlock.id);
        if(!motion){
            alert("再リロードしてください");
            return;
        }
        tmp.push({x: Number(x), y: Number(y), type: motion, num: number})
      }
    };
    tmp.sort((a,b)=> a.x - b.x)

    if(Array.from(new Set(tmp.map((block)=> block.y))).length !== 1){
      alert("正しくブロックを並べてください")
      return
    }

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
      case "MOTION_0":
        return BlockEnum.MOTION_0;
      case "MOTION_1":
        return BlockEnum.MOTION_1;
      case "MOTION_2":
        return BlockEnum.MOTION_2;
      case "MOTION_3":
        return BlockEnum.MOTION_3;
      case "MOTION_4":
        return BlockEnum.MOTION_4;
      case "MOTION_5":
        return BlockEnum.MOTION_5;
      case "MOTION_6":
        return BlockEnum.MOTION_6;
      case "MOTION_7":
        return BlockEnum.MOTION_7;
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

      {/* <button
        onClick={() => {
          console.log(isPointerDown);
        }}
        style={{ position: "absolute", top: "50px", right: "0px" }}
      >
        提出1
      </button> */}
    </>
  );
}