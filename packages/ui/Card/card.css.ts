import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";
import { space } from "../sprinkles.css";

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
