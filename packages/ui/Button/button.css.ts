import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";

export const button = recipe({
  base: {
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontFamily: vars.fonts.base,
    fontVariationSettings: '"CASL" 0',
    fontWeight: 400,
    transition: "all 1s",
    width: "fit-content",

    ":hover": {
      boxShadow: `
      -10px 0px 20px ${vars.color.brand[80]},
      10px 0px 20px ${vars.color.accent[80]};`,
      fontVariationSettings: '"CASL" 1',
      fontWeight: 700,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },

  variants: {
    color: {
      primary: {
        background: vars.color.background.base.normal,
        border: `2px solid ${vars.color.brand[50]}`,
        boxShadow: `
        -10px 0px 20px ${vars.color.brand[20]},
        10px 0px 20px ${vars.color.accent[20]};`,
        color: vars.color.typography.body,
      },
      secondary: {
        background: vars.color.typography.body,
        color: vars.color.background.mantle.normal,
      },
      brand: {
        background: vars.color.brand[50],
        color: vars.color.typography.body,
      },
    },
    size: {
      small: {
        fontSize: "0.75rem",
        padding: "8px 16px",
      },
      medium: {
        fontSize: "1rem",
        padding: "12px 24px",
      },
      large: {
        fontSize: "1.25rem",
        padding: "16px 32px",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "medium",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
