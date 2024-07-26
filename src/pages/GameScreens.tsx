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
}) => (
  <div className="text-white flex flex-col items-center py-6 px-14 text-3xl h-full bg-blue-100">
    <div className="mb-8">Level {level}</div>
    <WordsCard words={words} selectedWords={selectedWords} />
    <div className="flex gap-x-[6px] min-h-11 m-4">
      {selectedLetters.map((letter) => (
        <div className="w-[42px] aspect-square bg-gray-100 rounded-[10px] text-black-100 text-3xl flex justify-center items-center select-none">
          {letter}
        </div>
      ))}
    </div>
    <LetterCircle
      letters={letters}
      onLetterChange={onLetterChange}
      onCheckData={onCheckData}
      className="px-[15%]"
    />
  </div>
);

export default GameScreens;
