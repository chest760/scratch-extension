import { Button, Card, CardActions, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Block } from "../../types/Block";

type difficulty = "easy" | "normal" | "difficult" | "cannot"
type Props = {
  quiz: string;
  currentPage: number;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  submittedBlock: Block[][];
};

export const EvaluationPopup = (
    { quiz, setIsSubmitted, setIsGenerating, submittedBlock }
    : Props
) => {
  const [value, setValue] = useState<difficulty>("easy");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as difficulty);
  };

  const handleSumbit = () => {
    setIsGenerating(true);
    setIsSubmitted(false);
    chrome.runtime.sendMessage(
      { action: "submitDifficulty", content: submittedBlock, quiz: quiz, difficulty: value },
      function (response) {
        setIsGenerating(false);
        if (response.result === "Failed") {
          alert(response.message);
        }else{
            const res = response.content.replaceAll("```", "").replaceAll("json","")
            const jsonRes = JSON.parse(res)
            chrome.runtime.sendMessage(
              {
                action: "sendNewQuiz",
                content: jsonRes["result"]["quiz"],
              },
              function (response) {
                console.log(response);
              }
            ); 
        }
      }
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        backgroundColor: "rgba(0, 0, 0, .5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Card sx={{ padding: "30px" }}>
          <h3>この問題は難しかったですか？</h3>

          <RadioGroup
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="easy"
              control={<Radio />}
              label="かんたん"
            />
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="ふつう"
            />
            <FormControlLabel
              value="difficult"
              control={<Radio />}
              label="むずかしい"
            />
            <FormControlLabel
              value="cannot"
              control={<Radio />}
              label="わからない"
            />
          </RadioGroup>

          <CardActions sx={{ flex: "display", justifyContent: "end" }}>
            <Button onClick={handleSumbit} size="small" color="primary">
              ていしゅつ
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};   