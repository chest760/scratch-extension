import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../../styles/TopPage.module.scss";

export const TopPage = () => {
    const navigate = useNavigate();
    const [text, setText] = useState(""); // 入力内容を保持する状態を追加

    return (
      <div style={{ textAlign: "center" }}>
        <h1>ようこそ！！<br />
        「はじめる」をおして<br />べんきょうしたいコースを<br />えらぼう
        </h1>

        {/* 入力フィールドを追加 */}
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} // 入力内容を更新
          placeholder="ここに入力してください" 
          　
        />

        {/* 入力内容を表示 */}
        <p>入力した内容: {text}</p>

        <button 
          onClick={() => {
            sessionStorage.setItem('name',text);
            navigate("/select")
            }} 
          className={styles.btn}>
            はじめる
        </button>
      </div>
    );
}
