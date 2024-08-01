import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { isMobile } from "react-device-detect";
import { useOrientation } from "../hooks/useOrientation";

type WordLettersType = {
  word: string[];
  isActive?: boolean;
  className?: string;
};

export const WordLetters: FC<WordLettersType> = ({
  word,
  isActive,
  className,
}) => (
  <>
    {word.map((letter, index) => (
      <div
        key={letter + index}
        className={twMerge(
          "h-full aspect-square bg-gray-100 rounded-[20%] flex justify-center select-none",
          isActive && "bg-green-100 text-white",
          !isMobile && "items-center",
          className
        )}
      >
        {isActive && letter}
      </div>
    ))}
  </>
);

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
        "grid gap-1 phone:gap-1 items-center grid-cols-2",
        isLandscape && "phone:gap-1",
        className
      )}
    >
      {words.map((word, index) => {
        const isSelected = selectedWords.includes(word);

        return (
          <div
            key={word + index}
            className={twMerge(
              "flex justify-center text-[3cqh] sl:text-[42px] text-transparent select-none col-span-2 h-[4cqh] phone:h-[5cqh] sl:h-[6cqh]",
              words.length > 6 && "col-span-1 phone:gap-2 sl:h-[5cqh]",
              index > 5 && "col-span-2",
              isLandscape &&
                "h-[8cqh] text-[5cqh] sl:h-[8cqh] sl:text-[8cqh] sl:leading-4"
            )}
          >
            <div
              id={"card-" + word}
              className="flex gap-1 phone:gap-2 justify-center"
            >
              <WordLetters word={word.split("")} isActive={isSelected} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WordsCard;
