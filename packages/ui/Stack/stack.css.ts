import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const stack = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  variants: {
    align: {
      left: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      right: {
        alignItems: "flex-end",
      },
    },
  },
  defaultVariants: {
    align: "left",
  },
});
