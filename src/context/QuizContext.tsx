import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

type QuizContextProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  quiz: string[];
  setQuiz: Dispatch<SetStateAction<string[]>>;
};

const Quiz = [
    "くるまをがめんのまんなかで\nとめるにはどうしますか？",
    "いぬ、うさぎ、ぶたの\nじゅんばんでゴールするレースをつくろう",
    "もんだい：バスケットボールを10かいばうんどさせよう\n　　　　　　　　　　　　　　　　　　 きゃらくたー：バスケットボール　　　　　　　　　　　　　　　　　　　るーる：「くりかえし」をつかおう"

];

export const QuizContext = createContext<QuizContextProps>({
  currentPage: 0,
  setCurrentPage: () => {},
  quiz: [],
  setQuiz: () => {},
});

export const QuizProvider = ({children}: { children: React.ReactNode }) => {
  const [quiz, setQuiz] = useState<string[]>(Quiz);
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


