import { keyframes, style } from "@octocoach/ui/vanilla-extract";

export const pinClass = style([
  {
    position: "relative",
  },
]);

export const wordClass = style([
  {
    fontVariationSettings: `'CASL' var(--casl)`,
  },
]);

const bounceAnimation = keyframes({
  "0%": {
    transform: `translateY(${0})`,
  },
  "50%": {
    transform: `translateY(${3}em)`,
  },
  "100%": {
    transform: `translateY(${0})`,
  },
});

export const bounce = style({
  animationName: bounceAnimation,
  animationTimingFunction: "ease-in-out",
  animationDuration: "3s",
  animationIterationCount: "infinite",
});
