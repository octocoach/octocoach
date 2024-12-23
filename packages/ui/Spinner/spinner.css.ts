import { keyframes, style } from "@vanilla-extract/css";

const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const spinner = style({
  animationName: rotate,
  animationDuration: "0.5s",
  animationIterationCount: "infinite",
});
