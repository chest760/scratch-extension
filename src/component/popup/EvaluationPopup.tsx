import { Button, Card, CardActions, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Block } from "../../types/Block";
import { Result, QuizWithDifficulty } from "../../types/Prompt";

type difficulty = "easy" | "normal"  | "cannot" | "difficult"
type Props = {
  quiz: QuizWithDifficulty;
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

    const quizDescription = `もんだい: ${quiz.quiz_description}, キャラクター: ${quiz.character}, ルール: ${quiz.rule}`
    chrome.runtime.sendMessage(
      { action: "submitDifficulty", content: submittedBlock, quiz: quizDescription, difficulty: value, halstead_difficulty: Number(quiz.halstead_difficulty) },
      function (response) {
        setIsGenerating(false);
        if (response.result === "Failed") {
          alert(response.message);
        }else{
          try{
            const res = response.content.replaceAll("```", "").replaceAll("json","")
            const jsonRes: Result = JSON.parse(res) satisfies Result
  
            const newQuiz: QuizWithDifficulty  = {
              quiz_description: jsonRes.result.quiz.quiz_description,
              character: jsonRes.result.quiz.character,
              rule: jsonRes.result.quiz.rule,
              halstead_difficulty: jsonRes.result.complexity.halstead_difficulty
            }

            

            chrome.runtime.sendMessage(
              {
                action: "sendNewQuiz",
                content: newQuiz,
              },
              function (response) {
                console.log(response);
              }
            ); 
          }catch (e){
            console.log(e)
          }
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
          <h3>つぎはいまよりもどんなもんだいをときたいですか？</h3>

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