import { recipe } from "@vanilla-extract/recipes";

import { space } from "../sprinkles.css";

export const formField = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  },
  variants: {
    grow: {
      true: {
        flexGrow: 1,
      },
    },
  },
});
