import { style } from "@vanilla-extract/css";

import { sprinkles } from "../sprinkles.css";

export const schedulerContainer = style([
  {
    containerType: "inline-size",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sprinkles({ gap: 3, marginY: 6 }),
]);

export const schedulerContent = style([
  {
    display: "flex",
    flexDirection: "row",
    "@container": {
      "(max-width: 500px)": {
        flexDirection: "column",
      },
    },
  },
  sprinkles({ gap: 2 }),
]);
