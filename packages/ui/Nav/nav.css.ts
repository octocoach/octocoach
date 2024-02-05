import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

export const topBar = style([
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: vars.color.background.base[80],
    position: "sticky",
    zIndex: 1,
    top: 0,
    backdropFilter: "blur(8px)",
  },
  sprinkles({ padding: 1, paddingX: 2 }),
]);

export const logoWrapper = style([
  {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  sprinkles({ gap: 3 }),
]);

export const logo = style({
  height: "3rem",
});

export const nav = style([
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  sprinkles({ gap: 3 }),
]);
