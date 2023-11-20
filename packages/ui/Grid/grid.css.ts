import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "../sprinkles.css";

export const grid = recipe({
  base: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  variants: {
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
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
});

export type GridVariants = RecipeVariants<typeof grid>;
