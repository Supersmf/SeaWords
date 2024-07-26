import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type PopupType = PropsWithChildren & { open?: boolean };

const Popup: FC<PopupType> = ({ children, open = true }) => (
  <div
    className={twMerge(
      "fixed inset-0 z-50 bg-black-0/70 flex justify-center items-center flex-col",
      `${open ? "flex" : "hidden"}`
    )}
  >
    {children}
  </div>
);

export default Popup;
