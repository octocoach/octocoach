import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";

export const text = recipe({
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
    weight: {
      light: {
        fontWeight: 300,
      },
      regular: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semiBold: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
      extraBold: {
        fontWeight: 800,
      },
      heavy: {
        fontWeight: 900,
      },
      extraBlack: {
        fontWeight: 1000,
      },
    },
    variation: {
      default: {},
      casual: {
        fontVariationSettings: "'CASL' 1",
      },
      heading: {
        lineHeight: "0.95",
      },
    },
    textAlign: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },
  defaultVariants: {
    size: "m",
    weight: "regular",
    variation: "default",
  },
});

export type TextVariants = RecipeVariants<typeof text>;
