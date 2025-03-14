import { useCallback, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLocalStorage, useToggle } from "@uidotdev/usehooks";

import { getLevel, getWordsLetters } from "./utils";
import GameScreens from "./pages/GameScreens";
import VictoryScreen from "./pages/VictoryScreen";
import { useNewTabCheck } from "./hooks/useNewTabCheck";
import Popup from "./components/Popup";
import PopupRibbon from "./components/Icons/PopupRibbon";
import Button from "./components/Button";
import slideToAnimation from "./utils/slideToAnimation";
import { LetterCircleType } from "./components/LetterCircle";

import { useOrientation } from "./hooks/useOrientation";
import level1 from "./assets/levels/1.json";
import level2 from "./assets/levels/2.json";
import level3 from "./assets/levels/3.json";

const levels = [
  level1.words.sort((a, b) => a.length - b.length), //move sort to utils
  level2.words.sort((a, b) => a.length - b.length),
  level3.words.sort((a, b) => a.length - b.length),
];

const App = () => {
  const { isLandscape, isPortrait } = useOrientation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedWords, setSelectedWords] = useLocalStorage<string[]>(
    "selectedWords",
    []
  );
  const [level, setLevel] = useLocalStorage("level", 1);
  const [isProcessing, setIsProcessing] = useToggle();

  const { levelWords, letters } = useMemo(() => {
    const levelWords = getLevel(levels, level);
    const letters = getWordsLetters(levelWords);

    return { levelWords, letters };
  }, [level]);

  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const handleDataCheck = useCallback(() => {
    const word = selectedLetters.join("");

    if (levelWords.includes(word) && !selectedWords.includes(word)) {
      const elementFrom =
        containerRef.current?.querySelector<HTMLDivElement>(
          "#selected-letters"
        );
      const elementTo = containerRef.current?.querySelector<HTMLDivElement>(
        "#card-" + word
      );

      if (elementFrom && elementTo) {
        setIsProcessing();
        setSelectedLetters([]);
        slideToAnimation(elementFrom, elementTo, {
          deepClone: true,
          startDelay: 300,
          onfinish: () => {
            setSelectedWords([...selectedWords, word]);
            setSelectedLetters([]);
            setIsProcessing();
          },
        });
      }
    } else {
      setSelectedLetters([]);
    }
  }, [
    levelWords,
    selectedLetters,
    selectedWords,
    setIsProcessing,
    setSelectedWords,
  ]);

  const handleNextLevel = () => {
    setSelectedWords([]);
    setLevel(level + 1);
  };

  const [isOpenInOtherTab, setIsOpenInOtherTab] = useState(false);

  useNewTabCheck(() => setIsOpenInOtherTab(true));

  const handleLetterChange: LetterCircleType["onLetterChange"] = (letter) => {
    if (!isProcessing) {
      setSelectedLetters(letter);
    }
  };

  return (
    <div className="h-full w-screen bg-bodyPattern bg-repeat bg-contain flex justify-center ">
      <div
        ref={containerRef}
        className={twMerge(
          "w-[640px] h-full bg-blue-100",
          isPortrait && "w-full"
        )}
      >
        {levelWords.length === selectedWords.length ? (
          <VictoryScreen
            level={level}
            onLevelChange={handleNextLevel}
            isLandscape={isLandscape}
          />
        ) : (
          <GameScreens
            letters={letters}
            level={level}
            words={levelWords}
            selectedLetters={selectedLetters}
            selectedWords={selectedWords}
            onCheckData={handleDataCheck}
            onLetterChange={handleLetterChange}
            isLandscape={isLandscape}
            isPortrait={isPortrait}
          />
        )}
      </div>
      {isOpenInOtherTab && (
        <Popup>
          <div
            className={twMerge(
              "bg-white w-5/6 max-w-[530px] sl:h-[428px] rounded-[42px] relative px-6 pt-20 sl:pt-[118px] flex flex-col items-center justify-between pb-10",
              isLandscape &&
                "h-[80%] sl:h-[80%] w-[90%] sl:w-[90%] max-w-full sl:pt-24"
            )}
          >
            <PopupRibbon className="w-[250px] absolute -top-8 sl:w-auto sl:-top-5 left-1/2 -translate-x-1/2" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl leading-6 sl:text-[40px] text-white text-center sl:leading-[37px]">
              Две вкладки с игрой?
            </div>
            <div
              className={twMerge(
                "text-2xl sl:text-[32px] leading-8 sl:leading-[38px] text-center text-black-100",
                isLandscape && "sl:text-2xl"
              )}
            >
              Похоже, игра открыта в нескольких вкладках браузера. Чтобы
              продолжить играть в этой вкладке, обновите страницу.
            </div>
            <Button
              label="Обновить"
              onClick={() => window.location.reload()}
              className="mt-2"
            />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default App;
