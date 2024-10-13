import WestIcon from "@mui/icons-material/West";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/QuizContext";

export const VariableQuizPage = () => {
  const navigate = useNavigate();
  const useQuizContext = () => useContext(QuizContext);
  const { currentPage, quiz, setQuiz } = useQuizContext();


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id)
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "quiz", currentPage: 0, quiz: quiz[0] },
          () => {}
        );
    });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendNewQuiz") {
      const newArray = quiz.map((q, index) =>
        index === currentPage ? message.content : q
      );
      setQuiz(newArray);
      sendResponse(
        `SET NEW Parallel QUIZ Current Page 0 ${newArray}`
      );
    }
    return true;
  });


  return (
    <div>
      <div>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <WestIcon />
        </IconButton>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: "50px" }}>{quiz[0]}</h1>

        {/* ボタンにスタイルを追加 */}
        <button
          style={{
            backgroundColor: "red", // 赤色
            color: "white",
            padding: "15px 20px", // 大きさを調整
            fontSize: "18px", // 文字サイズを大きく
            margin: "10px", // ボタン間に間隔を設定
            border: "none",
            borderRadius: "5px", // 角を少し丸める
          }}
        >
          かんたん
        </button>

        <button
          style={{
            backgroundColor: "yellow", // 黄色
            color: "black", // テキスト色は黒に
            padding: "15px 30px",
            fontSize: "18px",
            margin: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ふつう
        </button>

        <button
          style={{
            backgroundColor: "blue", // 青色
            color: "white",
            padding: "15px 30px",
            fontSize: "18px",
            margin: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          むずかしい
        </button>

        <button
          style={{
            backgroundColor: "grey", // できないボタンの色
            color: "white",
            padding: "15px 30px",
            fontSize: "18px",
            margin: "10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          できない
        </button>
      </div>
    </div>
  );
}
