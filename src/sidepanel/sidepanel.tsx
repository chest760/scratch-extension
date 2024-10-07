import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopPage } from "../component/sidepanel/TopPage";

export const SidePanel = () => {
  const location = useLocation();

  const Display = () => {
    if (location.pathname == "/src/sidepanel/index.html") {
      return <TopPage />;
    } else {
      return <></>;
    }
  }
  
  useEffect(()=>{
    console.log(location.pathname)
  },[location])

  return (
    <>
    {Display()}
    </>
  );
};
