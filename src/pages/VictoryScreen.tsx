import { FC } from "react";
import { twMerge } from "tailwind-merge";

import Button from "../components/Button";

type VictoryScreenType = {
  level: number;
  onLevelChange: () => void;
  isLandscape?: boolean;
};

const VictoryScreen: FC<VictoryScreenType> = ({
  level,
  onLevelChange,
  isLandscape,
}) => (
  <div
    className={twMerge(
      "text-white flex flex-col items-center py-6 px-14 text-3xl h-full justify-around",
      isLandscape && "justify-start"
    )}
  >
    <div
      className={twMerge(
        "grid justify-center text-center font-bold text-[37px]",
        isLandscape && "mb-14"
      )}
    >
      Уровень {level} пройден{" "}
      <span className="mt-6 text-[53px]">Изумительно!</span>
    </div>
    <Button onClick={onLevelChange} label={`Уровень ${level + 1}`} />
  </div>
);

export default VictoryScreen;
