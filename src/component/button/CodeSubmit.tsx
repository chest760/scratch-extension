import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const CodeSubmit = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  // const [codeBlocks, setCodeBlocks] = useState<{"type": string, "number": number}[]>([])
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
          canvas.setAttribute("id", "Motion" + index.toString());
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

    addId();
  }, []);

  const observer = new MutationObserver((records) => {
      (records[0].target as Element).querySelectorAll(":scope > div:last-child")[0].setAttribute("id", selectedBlockRef.current)
  });

  const leave = () => {
    console.log(isPointerDownRef.current);
    if (isPointerDownRef.current) {
      const container = document.querySelector(".look");
      if(container)
      observer.observe(container, {
        childList: true,
      });
      setIsPointerDown(false);
    }
  };





  const onSubmit = () => {
  };

  return (
    <>
      <button
        style={{ position: "absolute", top: "0px", right: "0px" }}
        onClick={onSubmit}
      >
        提出
      </button>

      <button
        onClick={() => {
          console.log(isPointerDown);
        }}
        style={{ position: "absolute", top: "50px", right: "0px" }}
      >
        提出1
      </button>
    </>
  );
}