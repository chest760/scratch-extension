import { CircularProgress } from "@mui/material";

type Props = {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export const Cover = ({color}: Props) => {
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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
            <CircularProgress size="4rem" color={color}/>
        </div>
      </div>
    );
}