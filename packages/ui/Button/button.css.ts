import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";
import { keyframes } from "@vanilla-extract/css";

const buttonHover = keyframes({
  "0%": {
    fontVariationSettings: '"CASL" 0',
    fontWeight: 400,
  },
  "100%": {
    fontVariationSettings: '"CASL" 1',
    fontWeight: 700,
  },
});

export const button = recipe({
  base: {
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
    fontFamily: vars.fonts.base,
    fontSize: "1rem",
    fontVariationSettings: '"CASL" 0',
    fontWeight: 400,
    padding: "12px 24px",
    width: "fit-content",

    ":hover": {
      animation: `${buttonHover} 1s ease-in-out forwards`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },

  variants: {
    color: {
      primary: { background: vars.color.brand },
      secondary: { background: vars.color.accent },
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
