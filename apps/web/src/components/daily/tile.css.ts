import { style, vars } from "@octocoach/ui/vanilla-extract";

export const tileClass = style({
  backgroundColor: vars.color.background.crust.normal,
  position: "relative",
  display: "grid",
  placeItems: "center",
  height: "100%",
  maxHeight: "100%",
  maxWidth: "100%",
  overflow: "hidden",
  borderRadius: 6,
});

export const tileVideoClass = style({
  overflow: "hidden",
  height: "100%",
});
