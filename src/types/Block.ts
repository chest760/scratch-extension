export type MotionType = "MOVE RIGHT" | "MOVE LEFT" | "MOVE UP" | "MOVE DOWN" | "TURN RIGHT" | "TURN LEFT" | "HOP" | "GO HOME"
export type StartType = "START ON GREEN FLAG" | "START ON TAP TIC" | "START ON BACK TIC" | "START ON ORANGE MESSAGE" | "SEND START ORANGE MESSAGE"
export type LooksType = "SAY" | "GROW" | "SHRINK" | "RESET SIZE" | "HIDE" | "SHOW"
export type SoundType = "PLAY POP"
export type FlowType = "WAIT" | "STOP TIC" | "SET SPEED" | "REPEAT"
export type StopType = "END" | "REPEAT FOREVER"


export type BlockType = MotionType | StartType | LooksType | SoundType | FlowType | StopType

export type Block = {
    x: number;
    y: number;
    type: BlockType;
    num: number;
}