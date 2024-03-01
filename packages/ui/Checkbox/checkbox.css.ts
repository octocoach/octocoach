import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";

export const checkbox = style([
  {
    display: "flex",
    cursor: "pointer",
    userSelect: "none",
  },
  sprinkles({ gap: 2 }),
]);
