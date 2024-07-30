import { FC } from "react";

import LetterCircle, { LetterCircleType } from "../components/LetterCircle";
import WordsCard from "../components/WordsCard";
import { twMerge } from "tailwind-merge";

type GameScreensType = LetterCircleType & {
  level: number;
  words: string[];
  selectedWords: string[];
  selectedLetters: string[];
  isLandscape?: boolean;
};

const GameScreens: FC<GameScreensType> = ({
  level,
  words,
  letters,
  selectedWords,
  selectedLetters,
  onLetterChange,
  onCheckData,
  isLandscape,
}) => (
  <div
    className={twMerge(
      "text-white py-6 px-10 sl:text-3xl h-full bg-blue-100 grid grid-rows-[70px_minmax(20%,45%)_40%]",
      isLandscape && "py-1 grid-rows-[50px,40%] grid-cols-4"
    )}
  >
    <div
      className={twMerge(
        "text-center text-3xl",
        isLandscape && "col-span-4 text-2xl"
      )}
    >
      Уровень {level}
    </div>
    <WordsCard
      words={words}
      selectedWords={selectedWords}
      className={twMerge(isLandscape && "col-span-2")}
    />
    <div className={twMerge(isLandscape && "col-span-2")}>
      <div className={twMerge("flex gap-x-[6px] my-4 justify-center h-10")}>
        {selectedLetters.map((letter, index) => (
          <div
            key={letter + index}
            className="h-full aspect-square bg-gray-100 rounded-[10px] text-black-100 text-3xl flex justify-center items-center select-none pb-2 h-sl:pb-0"
          >
            {letter}
          </div>
        ))}
      </div>
      <LetterCircle
        letters={letters}
        onLetterChange={onLetterChange}
        onCheckData={onCheckData}
        className="h-3/4"
      />
    </div>
  </div>
);

export default GameScreens;
