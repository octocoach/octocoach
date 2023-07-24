import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";

export const form = style([
  {
    display: "flex",
    flexDirection: "column",
  },
  sprinkles({
    paddingY: 2,
    paddingX: 1,
  }),
]);
