import { Container } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import City from "../../assets/City.png";
import Farm from "../../assets/Farm.png";
import Gym from "../../assets/Gym.png";
import { QuizContext } from "../../context/QuizContext";
import styles from "../../sidepanel/index.module.scss";

export const SelectProject = () => {
  const navigate = useNavigate();
  const useQuizContext = () => useContext(QuizContext);
  const { setCurrentPage } = useQuizContext();
  return (
    <>
      <h1 className="title">スクラッチ拡張</h1>

      <Container className={styles.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            cursor: "pointer",
          }}
        >

          <h2 style={{ margin: "10px 0px 5px 0px", textAlign: "center" }}>
            まちをドライブ★
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={Farm} 
              className={styles.farm} 
              onClick={() => 
                {
                  navigate("/variablequiz")
                  setCurrentPage(0)

                }} // 画像をクリックしたらnavigateが実行される
              style={{ cursor: "pointer" }} // ポインターを変えることでクリック可能と分かりやすくする
            />
          </div>

        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            cursor: "pointer",
          }}
        >
       
          <h2 style={{ margin: "10px 0px 5px 0px", textAlign: "center" }}>
            どうぶつレース★★
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={City} 
              className={styles.farm} 
              onClick={() => {
                navigate("/parallelquiz")
                setCurrentPage(1)
              }} // 画像をクリックしたらnavigateが実行される
              style={{ cursor: "pointer" }} // ポインターを変えることでクリック可能と分かりやすくする
            />
          </div>
        </div>


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            cursor: "pointer",
          }}
        >

          <h2 style={{ margin: "10px 0px 5px 0px", textAlign: "center" }}>
            バスケット★★★
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={Gym} 
              className={styles.farm} 
              onClick={() => {
                navigate("/repetitionquiz")
                setCurrentPage(2);
              }} // 画像をクリックしたらnavigateが実行される
              style={{ cursor: "pointer" }} // ポインターを変えることでクリック可能と分かりやすくする
            />
          </div>
        </div>
      </Container>
    </>
  );
};


