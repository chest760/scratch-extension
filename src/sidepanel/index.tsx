import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SelectProject } from "../component/sidepanel/SelectProject";
import { TopPage } from "../component/sidepanel/TopPage";
import { SidePanel } from "./sidepanel";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/select" element={<SelectProject />} />
      </Routes>
      <SidePanel />
    </BrowserRouter>
  </StrictMode>
);
