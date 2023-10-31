import { style } from "@vanilla-extract/css";

export const pixelBackgroundWrapper = style({
  position: "relative",
  display: "grid",
  width: "100%",
});

export const pixelBackground = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
});

export const pixel = style({
  transition: "background-color 1s ease",
});
