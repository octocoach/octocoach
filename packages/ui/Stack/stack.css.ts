import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { space } from "../sprinkles.css";

export const stack = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
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
    wrap: {
      true: {
        flexWrap: "wrap",
      },
      false: {
        flexWrap: "nowrap",
      },
    },
  },
  defaultVariants: {
    align: "none",
    direction: "vertical",
    spacing: "normal",
    wrap: false,
  },
});

export type StackVariants = RecipeVariants<typeof stack>;
