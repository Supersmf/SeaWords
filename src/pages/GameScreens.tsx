import { FC } from "react";
import { twMerge } from "tailwind-merge";

import LetterCircle, { LetterCircleType } from "../components/LetterCircle";
import WordsCard, { WordLetters } from "../components/WordsCard";

type GameScreensType = LetterCircleType & {
  level: number;
  words: string[];
  selectedWords: string[];
  selectedLetters: string[];
  isLandscape?: boolean;
  isPortrait?: boolean;
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
  isPortrait,
}) => (
  <div
    className={twMerge(
      "text-white pt-6 px-10 sl:text-3xl h-full bg-blue-100 grid grid-rows-[60px_minmax(20%,30%)_50%] gap-y-4 phone:grid-rows-[60px_minmax(20%,40%)_45%] sl:grid-rows-[60px_minmax(20%,50%)_50%]",
      isLandscape &&
        "py-1 grid-rows-[50px,80%] sl:grid-rows-[50px,80%] grid-cols-4 gap-0 h-[80vh]"
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
      <div
        className={twMerge(
          "flex gap-x-[6px] my-6 justify-center text-[3cqh] h-[4cqh] phone:text-[5cqh] phone:h-[6cqh]",
          isLandscape && "mt-0"
        )}
      >
        <WordLetters
          word={selectedLetters}
          isActive
          className={twMerge(
            "bg-white text-black-100 leading-3 phone:leading-8",
            isLandscape && "h-[10cqh] text-[8cqh]",
            isPortrait && "h-[5cqh] text-[4cqh] leading-6"
          )}
        />
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
