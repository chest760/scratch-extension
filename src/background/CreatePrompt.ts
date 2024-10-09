import { Block, BlockType } from "../types/Block";

const LOOPCODE = `for(i=0; i<number; i++){
body}
`;
export const CreatePrompt = (content: Block[], nest: number=0): string => {
    let codeBlock = ""
    let func = ""
    for(let i = 0; i < content.length; i++){
        const block = content[i];
        if (block.type === "REPEAT") {
          const codes = CreatePrompt(block.loop, nest + 1);
          func = LOOPCODE.replace("number", block.num.toString())
            .replace("}", "  ".repeat(nest) + "}").replace("body", codes);
          codeBlock += "  ".repeat(nest) + func
        }else{
            func = functionMapping(block.type, block.num);
            codeBlock += "  ".repeat(nest) + func + "\n";
        }
    }

    console.log(codeBlock)
    return codeBlock
}




const functionMapping = (blockType: BlockType, num: number): string =>{
    switch(blockType){
        case "START ON BACK TIC":
            return "START"
        case "START ON GREEN FLAG":
            return "START"
        case "START ON ORANGE MESSAGE":
            return "START"
        case "START ON TAP TIC":
            return "START"
        case "END":
            return "END"
        case "MOVE LEFT":
            return `agent.MOVE(LEFT, ${num});`
        case "MOVE RIGHT":
            return `agent.MOVE(RIGHT, ${num});`
        case "MOVE UP":
            return `agent.MOVE(UP, ${num});`
        case "MOVE DOWN":
            return `agent.MOVE(DOWN, ${num});`
        case "TURN RIGHT":
            return `agent.TURN(RIGHT, ${num * 30});`
        case "TURN LEFT":
            return `agent.TURN(LEFT, ${num * 30});`
        case "HOP":
            return `agent.HOP(${num});`
        case "GO HOME":
            return `agent.GO_HOME();`
        default:
            return ""
    }
} 