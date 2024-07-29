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
      className,
      words.length > 6 && "grid-cols-2"
    )}
  >
    {words.map((word, index) => {
      const isSelected = selectedWords.includes(word);

      return (
        <div
          key={word + index}
          id={word}
          className="flex gap-x-2 justify-center h-full text-2xl sm:text-[42px] text-transparent select-none flex-nowrap w-full "
        >
          {word.split("").map((letter, index) => (
            <div
              key={letter + index}
              className={twMerge(
                "aspect-square bg-gray-100 rounded-[20%] flex justify-center items-center leading-3 sm:leading-6 pb-2 h-sm:pb-0",
                isSelected && "bg-green-100 text-white"
              )}
            >
              {isSelected ? letter : "."}
            </div>
          ))}
        </div>
      );
    })}
  </div>
);

export default WordsCard;
