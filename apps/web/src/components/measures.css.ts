import { keyframes, style } from "@octocoach/ui/vanilla-extract";

const jiggleAnimation = keyframes({
  "0%": { transform: "translate(0, 0) rotate(0deg)" },
  "2.5%": { transform: "translate(5px, 5px) rotate(5deg)" },
  "5%": { transform: "translate(0, 0) rotate(0deg)" },
  "7.5%": { transform: "translate(-5px, 5px) rotate(-5deg)" },
  "10%": { transform: "translate(0, 0) rotate(0deg)" },
  "100%": { transform: "translate(0, 0) rotate(0deg)" },
});

export const jiggleClass = style({
  animationName: jiggleAnimation,
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationDelay: "10s",
});
