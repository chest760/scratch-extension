import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { QuizWithDifficulty } from "../types/Prompt";



type QuizContextProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  quiz: QuizWithDifficulty[];
  setQuiz: Dispatch<SetStateAction<QuizWithDifficulty[]>>;
};

// const quiz = [
//   {
    
//   }
//     "くるまをがめんのまんなかで\nとめるにはどうしますか？",
//     "いぬ、うさぎ、ぶたの\nじゅんばんでゴールするレースをつくろう",
//     "もんだい：バスケットボールを10かいばうんどさせよう\n　　　　　　　　　　　　　　　　　　 きゃらくたー：バスケットボール　　　　　　　　　　　　　　　　　　　るーる：「くりかえし」をつかおう"

// ];


const initQuiz: QuizWithDifficulty[] = [
  {
    quiz_description: "くるまをがめんのまんなかで\nとめるにはどうしますか？",
    character: "くるま",
    rule: "繰り返しをつかおう",
    halstead_difficulty: "3"
  },
  {
    quiz_description: "じゅんばんでゴールするレースをつくろう",
    character: "いぬ、うさぎ、ぶた",
    rule: "繰り返しをつかおう",
    halstead_difficulty: "3"
  },
  {
    quiz_description: "バスケットボールを10かいばうんどさせよう",
    character: "バスケットボール",
    rule: "「くりかえし」をつかおう",
    halstead_difficulty: "3"
  }
]

export const QuizContext = createContext<QuizContextProps>({
  currentPage: 0,
  setCurrentPage: () => {},
  quiz: [],
  setQuiz: () => {},
});

export const QuizProvider = ({children}: { children: React.ReactNode }) => {
  const [quiz, setQuiz] = useState<QuizWithDifficulty[]>(initQuiz);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(()=>{
    console.log("###############")
  },[])
  
  return (
    <QuizContext.Provider value={{ quiz, setQuiz, currentPage, setCurrentPage }}>
      {children}
    </QuizContext.Provider>
  );
}


