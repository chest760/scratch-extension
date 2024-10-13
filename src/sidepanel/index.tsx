import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ParallelQuizPage } from "../component/sidepanel/ParallelQuizPage";
import { RepetitionQuizPage } from "../component/sidepanel/RepetitionQuizPage";
import { SelectProject } from "../component/sidepanel/SelectProject";
import { TopPage } from "../component/sidepanel/TopPage";
import { VariableQuizPage } from "../component/sidepanel/VariableQuizPage";
import { QuizProvider } from "../context/QuizContext";
import { SidePanel } from "./sidepanel";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizProvider>
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
    </QuizProvider>
  </StrictMode>
);
