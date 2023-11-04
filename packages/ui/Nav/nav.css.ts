import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

export const nav = style([
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: vars.color.background.base[80],
    position: "sticky",
    top: 0,
  },
  sprinkles({ padding: 1, paddingX: 2 }),
]);

export const logoWrapper = style([
  {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  sprinkles({ gap: 2 }),
]);

export const logo = style({
  height: "3rem",
});
