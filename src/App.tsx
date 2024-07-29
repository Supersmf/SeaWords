import { useMemo, useState } from "react";
import level1 from "./assets/levels/1.json";
import level2 from "./assets/levels/2.json";
import level3 from "./assets/levels/3.json";
import { getLevel, getWordsLetters } from "./utils";
import { useLocalStorage } from "@uidotdev/usehooks";
import GameScreens from "./pages/GameScreens";
import VictoryScreen from "./pages/VictoryScreen";
import { useNewTabCheck } from "./hooks/useNewTabCheck";
import Popup from "./components/Popup";
import PopupRibbon from "./components/Icons/PopupRibbon";
import Button from "./components/Button";

const levels = [
  level1.words.sort((a, b) => a.length - b.length), //move sort to utils
  level2.words.sort((a, b) => a.length - b.length),
  level3.words.sort((a, b) => a.length - b.length),
];

const App = () => {
  const [selectedLetters, setSelectedLettersIds] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useLocalStorage<string[]>(
    "selectedWords",
    []
  );
  const [level, setLevel] = useLocalStorage("level", 1);

  const levelWords = useMemo(() => getLevel(levels, level), [level]);

  const letters = useMemo(() => getWordsLetters(levelWords), [levelWords]);

  const handleDataCheck = () => {
    const word = selectedLetters.join("");

    if (levelWords.includes(word) && !selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleNextLevel = () => {
    setSelectedWords([]);
    setLevel(level + 1);
  };
  const [isOpenInOtherTab, setIsOpenInOtherTab] = useState(false);

  useNewTabCheck(() => setIsOpenInOtherTab(true));

  return (
    <div className="h-full w-screen bg-bodyPattern bg-repeat bg-contain flex justify-center ">
      <div className="w-[640px] h-full bg-blue-100">
        {levelWords.length === selectedWords.length ? (
          <VictoryScreen level={level} onLevelChange={handleNextLevel} />
        ) : (
          <GameScreens
            letters={letters}
            level={level}
            words={levelWords}
            selectedLetters={selectedLetters}
            selectedWords={selectedWords}
            onCheckData={handleDataCheck}
            onLetterChange={setSelectedLettersIds}
          />
        )}
      </div>
      {isOpenInOtherTab && (
        <Popup>
          <div className="bg-white w-5/6 max-w-[530px] sm:h-[428px] rounded-[42px] relative px-6 pt-20 sm:pt-[118px] flex flex-col items-center justify-between pb-10">
            <PopupRibbon className="w-[250px] absolute -top-8 sm:w-auto sm:-top-5 left-1/2 -translate-x-1/2" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl leading-6 sm:text-[40px] text-white text-center sm:leading-[37px]">
              Две вкладки с игрой?
            </div>
            <div className="text-2xl sm:text-[32px] leading-8 sm:leading-[38px] text-center text-black-100">
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
