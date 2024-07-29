import { FC } from "react";

import LetterCircle, { LetterCircleType } from "../components/LetterCircle";
import WordsCard from "../components/WordsCard";

type GameScreensType = LetterCircleType & {
  level: number;
  words: string[];
  selectedWords: string[];
  selectedLetters: string[];
};

const GameScreens: FC<GameScreensType> = ({
  level,
  words,
  letters,
  selectedWords,
  selectedLetters,
  onLetterChange,
  onCheckData,
}) => {
  return (
    <div className="text-white py-6 px-10 lg:text-3xl h-full bg-blue-100 grid grid-rows-[70px_minmax(250px,_1fr)_50px_340px] sm:grid-rows-[70px_minmax(200px,_1fr)_50px_340px]">
      <div className="text-center text-3xl">Уровень {level}</div>
      <WordsCard words={words} selectedWords={selectedWords} />
      <div className="flex gap-x-[6px] py-2 justify-center">
        {selectedLetters.map((letter, index) => (
          <div
            key={letter + index}
            className="h-full aspect-square bg-gray-100 rounded-[10px] text-black-100 text-3xl flex justify-center items-center select-none pb-2 h-sm:pb-0"
          >
            {letter}
          </div>
        ))}
      </div>
      <LetterCircle
        letters={letters}
        onLetterChange={onLetterChange}
        onCheckData={onCheckData}
      />
    </div>
  );
};

export default GameScreens;
