import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";

export const person = style([
  {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    textAlign: "center",
    maxWidth: 300,
  },
  sprinkles({ gap: 2, paddingY: 4 }),
]);

export const personImage = style({
  imageRendering: "pixelated",
});
