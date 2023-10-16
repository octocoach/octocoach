import { variants } from "@catppuccin/palette";
import { createTheme } from "@vanilla-extract/css";
import { createAlpha } from "../helpers";
import { vars } from "../theme.css";

export type Flavor = keyof typeof variants;

export const colorAlphas = {
  normal: "",
  80: "",
  50: "",
  20: "",
};

export const createColorAlphas = (color: string) => ({
  normal: color,
  80: createAlpha(color, 0.8),
  50: createAlpha(color, 0.5),
  20: createAlpha(color, 0.2),
});

export const createThemeBase = (flavor: Flavor) => {
  const variant = variants[flavor];

  return {
    fonts: {
      base: "'Recursive', sans-serif",
    },

    color: {
      brand: createColorAlphas(variant.mauve.hsl),
      accent: createColorAlphas(variant.sapphire.hsl),
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
        selection: createAlpha(variant.surface2.hex, 0.5),
        cursor: variant.rosewater.hsl,
      },
    },
  };
};

export const createThemeVariant = (flavor: Flavor) => {
  return createTheme(vars, createThemeBase(flavor));
};
