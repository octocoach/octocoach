import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";
import { space } from "../sprinkles.css";
import { createAlpha } from "../helpers";

export const card = recipe({
  base: {
    borderRadius: space[1],
    padding: space[4],
    width: "100%",
  },
  variants: {
    surface: {
      base: {
        background: vars.color.surface[0],
      },
      base20: {
        background: vars.color.background.base[20],
      },
      base50: {
        background: vars.color.background.base[50],
      },
      base80: {
        background: vars.color.background.base[80],
      },
      mantle: {
        background: vars.color.surface[1],
      },
      crust: {
        background: vars.color.surface[2],
      },
    },
  },
  defaultVariants: {
    surface: "base",
  },
});

export type CardVariants = RecipeVariants<typeof card>;
