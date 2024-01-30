import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "../sprinkles.css";

export const grid = recipe({
  base: {
    display: "grid",
  },
  variants: {
    columns: {
      equal: {
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridAutoFlow: "row",
      },
      auto: {
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, auto))",
        gridAutoFlow: "row",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    gap: {
      none: {
        gap: 0,
      },
      small: sprinkles({ gap: 1 }),
      medium: sprinkles({ gap: 2 }),
      large: sprinkles({ gap: 3 }),
      extraLarge: sprinkles({ gap: 4 }),
    },
    placeItems: {
      center: {
        placeItems: "center",
      },
      start: {
        placeItems: "start",
      },
      end: {
        placeItems: "end",
      },
    },
    justifyItems: {
      center: {
        justifyItems: "center",
      },
      start: {
        justifyItems: "start",
      },
      end: {
        justifyItems: "end",
      },
    },
  },
  defaultVariants: {
    columns: "equal",
    gap: "medium",
  },
});

export type GridVariants = RecipeVariants<typeof grid>;
