import { useEffect } from "react";

export const VariableQuizPage = () => {
  const QUIZ = "くるまをがめんのまんなかで\nとめるにはどうしますか？";
  useEffect(()=>{
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id)
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "quiz", content: QUIZ },
          () => {}
        );
    });
  },[])

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "50px" }}>{QUIZ}</h1>

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
  );
}
