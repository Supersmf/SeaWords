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
      "grid gap-2 phone:gap-4 items-center grid-cols-2",
      className
    )}
  >
    {words.map((word, index) => {
      const isSelected = selectedWords.includes(word);

      return (
        <div
          key={word + index}
          id={word}
          className={twMerge(
            "flex gap-2 phone:gap-4 justify-center text-[3cqh] sm:text-[42px] text-transparent select-none col-span-2 h-full",
            words.length > 6 && "col-span-1 phone:gap-2",
            index > 5 && "col-span-2"
          )}
        >
          {word.split("").map((letter, index) => (
            <div
              key={letter + index}
              className={twMerge(
                "h-full aspect-square bg-gray-100 rounded-[20%] flex justify-center items-center leading-3 phone:leading-6",
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
