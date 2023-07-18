import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { space } from "../sprinkles.css";

export const stack = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  variants: {
    align: {
      none: {},
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
    direction: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
    spacing: {
      tight: {
        gap: space[2],
      },
      normal: {
        gap: space[4],
      },
      loose: {
        gap: space[6],
      },
    },
  },
  defaultVariants: {
    align: "none",
    direction: "vertical",
    spacing: "normal",
  },
});

export type StackVariants = RecipeVariants<typeof stack>;
