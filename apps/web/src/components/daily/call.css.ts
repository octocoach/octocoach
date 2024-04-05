import { style, vars } from "@octocoach/ui/vanilla-extract";

type Area = "main" | "tray" | ".";

const mkGridTemplateAreas = (areas: Area[][]): string => {
  if (areas.length === 0) {
    throw new Error("Area list can't be empty");
  }

  const { length } = areas[0];

  if (!areas.every((area) => area.length === length)) {
    throw new Error("Grid Template Areas must have the same length");
  }

  return areas.map((a) => `"${a.join(" ")}"`).join(" ");
};

export const callClass = style([
  {
    backgroundColor: vars.color.background.crust.normal,
    position: "absolute",
    display: "grid",
    gridTemplateAreas: mkGridTemplateAreas([["main"], ["tray"]]),
    gridTemplateRows: "1fr auto",
    placeItems: "center",
    zIndex: 2,
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
  },
]);

export const mainTileClass = style([
  {
    gridArea: "main",
    position: "relative",
  },
]);

export const callGridClass = style([
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

export const localVideoTile = style([
  {
    position: "absolute",
    width: 200,
    right: 10,
    bottom: 10,
  },
]);
