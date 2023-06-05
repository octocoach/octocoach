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
    align: "left",
    spacing: "normal",
  },
});

export type StackVariants = RecipeVariants<typeof stack>;
