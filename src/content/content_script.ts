import { BlockType } from "../types/Block";

export const isStartType = (value: BlockType): boolean => {
    console.log(value)
  return [
    "START ON GREEN FLAG",
    "START ON TAP TIC",
    "START ON BACK TIC",
    "START ON ORANGE MESSAGE",
    "SEND START ORANGE MESSAGE",
  ].includes(value);
};

export const isEndType = (value: BlockType): boolean => {
  return ["END", "REPEAT FOREVER"].includes(value);
};
