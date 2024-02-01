import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";

export const button = recipe({
  base: {
    borderStyle: "solid",
    cursor: "pointer",
    fontFamily: vars.fonts.base,
    fontVariationSettings: '"CASL" 0',
    fontWeight: 400,
    transition: "all 1s",
    width: "fit-content",
    ":hover": {
      fontVariationSettings: '"CASL" 1',
      fontWeight: 700,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },

  variants: {
    glow: {
      true: {
        boxShadow: `
        -10px 0px 20px ${vars.color.brand[20]},
        10px 0px 20px ${vars.color.accent[20]};`,
        ":hover": {
          boxShadow: `
          -10px 0px 20px ${vars.color.brand[80]},
          10px 0px 20px ${vars.color.accent[80]};`,
        },
        false: {
          boxShadow: "none",
        },
      },
    },
    color: {
      brand: {
        backgroundColor: vars.color.background.base.normal,
        color: vars.color.typography.heading,
        borderColor: vars.color.brand.normal,
      },
      accent: {
        backgroundColor: vars.color.background.base.normal,
        color: vars.color.typography.heading,
        borderColor: vars.color.accent.normal,
      },
      error: {
        backgroundColor: vars.color.background.base.normal,
        color: vars.color.typography.error,
        borderColor: vars.color.typography.error,
      },
      warning: {
        backgroundColor: vars.color.background.base.normal,
        color: vars.color.typography.warning,
        borderColor: vars.color.typography.warning,
      },
      success: {
        backgroundColor: vars.color.background.base.normal,
        color: vars.color.typography.success,
        borderColor: vars.color.typography.success,
      },
      contrast: {
        backgroundColor: vars.color.typography.body,
        color: vars.color.background.crust.normal,
        borderColor: "transparent",
      },
      subtle: {
        backgroundColor: vars.color.background.crust.normal,
        color: vars.color.typography.body,
        borderColor: "transparent",
        textDecoration: "underline",
      },
    },
    size: {
      small: {
        fontSize: "0.75rem",
        padding: "8px 16px",
        borderWidth: 1,
        borderRadius: 4,
      },
      medium: {
        fontSize: "1rem",
        padding: "12px 24px",
        borderWidth: 2,
        borderRadius: 6,
      },
      large: {
        fontSize: "1.25rem",
        padding: "16px 32px",
        borderWidth: 4,
        borderRadius: 8,
      },
    },
  },
  defaultVariants: {
    color: "brand",
    size: "medium",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
