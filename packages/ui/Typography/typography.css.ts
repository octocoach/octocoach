import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";

export const typography = recipe({
  base: {
    fontFamily: vars.fonts.base,
    color: vars.color.typography.heading,
  },
  variants: {
    size: {
      xl: {
        fontSize: "2rem",
      },
      l: {
        fontSize: "1.3rem",
      },
      m: {
        fontSize: "1rem",
      },
      s: {
        fontSize: ".8rem",
      },
    },
  },
  defaultVariants: {
    size: "m",
  },
});

export type TypographyVariants = RecipeVariants<typeof typography>;
