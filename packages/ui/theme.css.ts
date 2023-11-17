import { createThemeContract, style } from "@vanilla-extract/css";
import {
  Flavor,
  colorAlphas,
  createThemeBase,
  createThemeVariant,
} from "./theme/creator";

export const vars = createThemeContract({
  fonts: {
    base: "'Recursive', sans-serif",
  },

  color: {
    brand: colorAlphas,
    accent: colorAlphas,
    background: {
      base: colorAlphas,
      mantle: colorAlphas,
      crust: colorAlphas,
    },
    surface: {
      0: "",
      1: "",
      2: "",
    },
    overlays: {
      0: "",
      1: "",
      2: "",
    },
    typography: {
      body: "",
      heading: "",
      subHeading: "",
      label: "",
      subtle: "",
      link: "",
      success: "",
      warning: "",
      error: "",
      tag: "",
      selection: "",
      cursor: "",
    },
  },
});

const flavors: Flavor[] = ["latte", "frappe", "macchiato", "mocha"];

export const themeClass = flavors.reduce(
  (acc, cur) => ({ ...acc, [cur]: createThemeVariant(cur) }),
  {}
) as Record<Flavor, string>;

export const themeValue = flavors.reduce(
  (acc, cur) => ({ ...acc, [cur]: createThemeBase(cur) }),
  {}
) as Record<Flavor, ReturnType<typeof createThemeBase>>;

export const bg = style({
  backgroundColor: vars.color.background.base.normal,
  color: vars.color.typography.body,
});
