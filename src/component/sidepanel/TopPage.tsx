import { useNavigate } from "react-router-dom"; 
import styles from "../../styles/TopPage.module.scss";

export const TopPage = () => {
    const navigate = useNavigate();
    return (
      <div style={{ textAlign: "center" }}>
        <h1>ようこそ !!</h1>
        <button onClick={()=>{
            navigate("/select")
        }} className={styles.btn}>
            始める
        </button>
      </div>
    );
}