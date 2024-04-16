import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

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
    justify: {
      none: {},
      left: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      right: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    direction: {
      horizontal: {
        flexDirection: "row",
        flexGrow: 1,
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
    fullWidth: {
      true: {
        width: "100%",
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
