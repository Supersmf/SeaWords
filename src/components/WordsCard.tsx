import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { isMobile } from "react-device-detect";
import { useOrientation } from "../hooks/useOrientation";

type WordsCardType = {
  words: string[];
  selectedWords: string[];
  className?: string;
};

const WordsCard: FC<WordsCardType> = ({ words, selectedWords, className }) => {
  const { isLandscape } = useOrientation();

  return (
    <div
      className={twMerge(
        "grid gap-1 phone:gap-2 items-center grid-cols-2",
        isLandscape && "phone:gap-1",
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
              "flex gap-1 phone:gap-2 justify-center text-[3cqh] sl:text-[42px] text-transparent select-none col-span-2 h-[4cqh] phone:h-[5cqh] sl:h-[6cqh]",
              words.length > 6 && "col-span-1 phone:gap-2",
              index > 5 && "col-span-2",
              isLandscape && "h-[8cqh] text-[5cqh] sl:text-[6cqh]"
            )}
          >
            {word.split("").map((letter, index) => (
              <div
                key={letter + index}
                className={twMerge(
                  "h-full aspect-square bg-gray-100 rounded-[20%] flex justify-center leading-3 phone:leading-6",
                  isSelected && "bg-green-100 text-white",
                  !isMobile && "items-center",
                  isLandscape && ""
                )}
              >
                {isSelected && letter}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default WordsCard;
