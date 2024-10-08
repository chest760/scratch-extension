import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SelectProject } from "../component/sidepanel/SelectProject";
import { TopPage } from "../component/sidepanel/TopPage";
import { SidePanel } from "./sidepanel";
import { VariableQuizPage } from "../component/sidepanel/VariableQuizPage";
import { ParallelQuizPage } from "../component/sidepanel/ParallelQuizPage";
import { RepetitionQuizPage } from "../component/sidepanel/RepetitionQuizPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/select" element={<SelectProject />} />
        <Route path="/variablequiz" element={<VariableQuizPage />} />
        <Route path="/parallelquiz" element={<ParallelQuizPage />} />
        <Route path="/repetitionquiz" element={<RepetitionQuizPage />} />
      </Routes>
      <SidePanel />
    </BrowserRouter>
  </StrictMode>
);
