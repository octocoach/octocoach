import { style } from "@vanilla-extract/css";
import { space } from "../sprinkles.css";
import { recipe } from "@vanilla-extract/recipes";

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
