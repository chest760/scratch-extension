import { useNavigate } from "react-router-dom"; 
import styles from "../../styles/TopPage.module.scss";

export const TopPage = () => {
    const navigate = useNavigate();
    return (
      <div style={{ textAlign: "center" }}>
        <h1>ようこそ！！<br />
        「はじめる」をおして<br />べんきょうしたいコースを<br />えらぼう
        </h1>
        <button onClick={()=>{
            navigate("/select")
        }} className={styles.btn}>
            はじめる
        </button>
      </div>
    );
}