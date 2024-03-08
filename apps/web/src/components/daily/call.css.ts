import { style, vars } from "@octocoach/ui/vanilla-extract";

export const callClass = style([
  {
    backgroundColor: vars.color.background.crust.normal,
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gridAutoRows: "1fr",
    width: "100%",
    position: "relative",
  },
]);
