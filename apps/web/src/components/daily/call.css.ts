import { sprinkles, style, vars } from "@octocoach/ui/vanilla-extract";

type Area = "main" | "tray" | "thumbs";

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
    backgroundColor: vars.color.background.base.normal,
    position: "absolute",
    display: "grid",
    gap: 6,
    gridTemplateAreas: mkGridTemplateAreas([["main"], ["thumbs"], ["tray"]]),
    gridTemplateRows: "1fr 200px auto",
    placeItems: "center",
    zIndex: 2,
    top: 0,
    left: 0,
    height: "100vh",
    maxHeight: "100vh",
    width: "100vw",
    maxWidth: "100vw",
  },
]);

export const mainTileClass = style([
  {
    gridArea: "main",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
]);

export const thumbsTileClass = style([
  {
    gridArea: "thumbs",
    display: "grid",
    placeItems: "center",
    maxHeight: "100%",
  },
  sprinkles({ gap: 2 }),
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
    width: "20%",
    right: "5%",
    bottom: "5%",
  },
]);
