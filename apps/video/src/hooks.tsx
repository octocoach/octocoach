import { useMemo } from "react";
import { useVideoConfig } from "remotion";

export const useIsPortrait = () => {
  const { width, height } = useVideoConfig();

  return useMemo(() => width < height, [width, height]);
};

export const useIsLandscape = () => {
  const { width, height } = useVideoConfig();

  return useMemo(() => width > height, [width, height]);
};

export const useIsSquare = () => {
  const { width, height } = useVideoConfig();

  return useMemo(() => width === height, [width, height]);
};
