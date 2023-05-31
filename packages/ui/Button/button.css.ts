import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";

export const button = recipe({
  base: {
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    color: "white",
    padding: "12px 24px",
  },

  variants: {
    color: {
      primary: { background: vars.color.brand },
      secondary: { background: vars.color.accent },
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
