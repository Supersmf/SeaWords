import { FC } from "react";
import Button from "../components/Button";

type VictoryScreenType = {
  level: number;
  onLevelChange: () => void;
};

const VictoryScreen: FC<VictoryScreenType> = ({ level, onLevelChange }) => (
  <div className="text-white flex flex-col items-center py-6 px-14 text-3xl h-full justify-around">
    <div className="grid justify-center text-center font-bold text-[37px]">
      Уровень {level} пройден{" "}
      <span className="mt-6 text-[53px]">Изумительно!</span>
    </div>
    <Button onClick={onLevelChange} label={`Уровень ${level + 1}`} />
  </div>
);

export default VictoryScreen;
