export type BlockType = "MOVE RIGHT" | "MOVE LEFT" | "MOVE UP" | "MOVE DOWN" | "TURN RIGHT" | "TURN LEFT" | "HOP" | "GO HOME"

export type Block = {
    x: number;
    y: number;
    type: BlockType;
    num: number;
}