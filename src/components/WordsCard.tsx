import { FC } from "react";
import { twMerge } from "tailwind-merge";

type WordsCardType = {
  words: string[];
  selectedWords: string[];
  className?: string;
};

const WordsCard: FC<WordsCardType> = ({ words, selectedWords, className }) => (
  <div
    className={twMerge(
      "grid gap-4 items-center grid-cols-1",
      className
      // words.length > 6 && "grid-cols-2"
    )}
  >
    {words.map((word, index) => (
      <div
        key={word + index}
        id={word}
        className={twMerge(
          "flex gap-x-2 justify-center h-full text-2xl lg:text-[42px] text-transparent select-none flex-nowrap w-full leading-6",
          selectedWords.includes(word) && "text-black-100"
        )}
      >
        {word.split("").map((letter, index) => (
          <div
            key={letter + index}
            className="aspect-square  bg-gray-100 rounded-[20%] flex justify-center items-center"
          >
            {letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default WordsCard;
