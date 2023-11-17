import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";

export const formCheckbox = style([
  {
    display: "flex",
  },
  sprinkles({ gap: 2 }),
]);
