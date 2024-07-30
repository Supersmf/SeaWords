import { FC } from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = {
  label: string;
  onClick: () => void;
  className?: string;
};

const Button: FC<ButtonType> = ({ label, onClick, className }) => (
  <div
    className={twMerge(
      "w-60 h-16 lg:w-[330px] lg:h-[90px] relative text-white text-3xl lg:text-[42px]",
      className
    )}
  >
    <div className="bg-green-200 h-full w-full absolute top-2 rounded-full"></div>
    <button
      onClick={onClick}
      className=" h-full w-full rounded-full relative translate-y-[10px] content bottom-2 bg-green-100 hover:opacity-80 cursor-pointer"
    >
      {label}
    </button>
  </div>
);

export default Button;
