import { FC } from "react";

type WordsCardType = {
  words: string[];
  selectedWords: string[];
};

const WordsCard: FC<WordsCardType> = ({ words, selectedWords }) => (
  <div className="flex flex-col gap-y-[6px] items-center">
    {words.map((word, index) => (
      <div
        key={word + index}
        id={word}
        className="flex gap-x-[6px] text-black-100 text-3xl"
      >
        {word.split("").map((letter, index) => (
          <div
            key={letter + index}
            className="min-w-[60px] max-w-[72px] aspect-square bg-gray-100 rounded-[20px] flex justify-center items-center"
          >
            {selectedWords.includes(word) && letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default WordsCard;
