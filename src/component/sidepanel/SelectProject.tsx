import { Container } from "@mui/material";
import City from "../../assets/City.png";
import Farm from "../../assets/Farm.png";
import Gym from "../../assets/Gym.png";
import styles from "../../sidepanel/index.module.scss";
import { useNavigate } from "react-router-dom"; 

export const SelectProject = () => {
const navigate = useNavigate();
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
            変数を学ぶ
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={Farm} 
              className={styles.farm} 
              onClick={() => navigate("/variablequiz")} // 画像をクリックしたらnavigateが実行される
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
            並列処理を学ぶ
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={City} 
              className={styles.farm} 
              onClick={() => navigate("/parallelquiz")} // 画像をクリックしたらnavigateが実行される
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
            繰り返しを学ぶ
          </h2>
          <div style={{ flexGrow: 1, margin: "0 auto" }}>
            {/* 画像にonClickを追加 */}
            <img 
              src={Gym} 
              className={styles.farm} 
              onClick={() => navigate("/repetitionquiz")} // 画像をクリックしたらnavigateが実行される
              style={{ cursor: "pointer" }} // ポインターを変えることでクリック可能と分かりやすくする
            />
          </div>
        </div>
      </Container>
    </>
  );
};


