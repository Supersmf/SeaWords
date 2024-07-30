import { useOrientation as useOrientationLib } from "@uidotdev/usehooks";
import { isMobile } from "react-device-detect";

import { VIEW_TYPE } from "../enum";

export const useOrientation = () => {
  const { type } = useOrientationLib();
  const isLandscape = [
    VIEW_TYPE.LANDSCAPE_PRIMARY,
    VIEW_TYPE.LANDSCAPE_SECONDARY,
  ].includes(type as VIEW_TYPE);

  return { isLandscape: isLandscape && isMobile, isPortrait: !isLandscape && isMobile };
};
