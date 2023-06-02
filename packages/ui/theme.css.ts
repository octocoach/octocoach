import { variants } from "@catppuccin/palette";
import { createTheme, createThemeContract, style } from "@vanilla-extract/css";
import { colord } from "colord";

type Flavor = keyof typeof variants;

export const vars = createThemeContract({
  fonts: {
    base: "'Recursive', sans-serif",
  },

  color: {
    brand: "",
    accent: "",
    background: {
      base: "",
      mantle: "",
      crust: "",
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

const createThemeVariant = (flavor: Flavor) => {
  const variant = variants[flavor];
  return createTheme(vars, {
    fonts: {
      base: "'Recursive', sans-serif",
    },

    color: {
      brand: variant.mauve.hsl,
      accent: variant.sapphire.hsl,
      background: {
        base: variant.base.hsl,
        mantle: variant.mantle.hsl,
        crust: variant.crust.hsl,
      },
      surface: {
        0: variant.surface0.hsl,
        1: variant.surface1.hsl,
        2: variant.surface2.hsl,
      },
      overlays: {
        0: variant.overlay0.hsl,
        1: variant.overlay1.hsl,
        2: variant.overlay2.hsl,
      },
      typography: {
        body: variant.text.hsl,
        heading: variant.text.hsl,
        subHeading: variant.subtext0.hsl,
        label: variant.subtext1.hsl,
        subtle: variant.overlay0.hsl,
        link: variant.blue.hsl,
        success: variant.green.hsl,
        warning: variant.yellow.hsl,
        error: variant.red.hsl,
        tag: variant.blue.hsl,
        selection: colord(variant.surface2.hex).alpha(0.5).toHslString(),
        cursor: variant.rosewater.hsl,
      },
    },
  });
};

const flavors: Flavor[] = ["latte", "frappe", "macchiato", "mocha"];

export const themeClass = flavors.reduce(
  (acc, cur) => ({ ...acc, [cur]: createThemeVariant(cur) }),
  {}
) as Record<Flavor, string>;

export const bg = style({
  backgroundColor: vars.color.background.base,
});
