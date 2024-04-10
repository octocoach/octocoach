import { flavors, type FlavorName } from "@catppuccin/palette";
import { createTheme } from "@vanilla-extract/css";
import { createAlpha } from "../helpers";
import { vars } from "../theme.css";

export type { FlavorName } from "@catppuccin/palette";

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

export const createThemeBase = (flavor: FlavorName) => {
  const variant = flavors[flavor].colors;

  return {
    fonts: {
      base: "var(--font-recursive)",
    },

    color: {
      brand: createColorAlphas(variant.mauve.hex),
      accent: createColorAlphas(variant.sapphire.hex),
      background: {
        base: createColorAlphas(variant.base.hex),
        mantle: createColorAlphas(variant.mantle.hex),
        crust: createColorAlphas(variant.crust.hex),
      },
      surface: {
        0: variant.surface0.hex,
        1: variant.surface1.hex,
        2: variant.surface2.hex,
      },
      overlays: {
        0: variant.overlay0.hex,
        1: variant.overlay1.hex,
        2: variant.overlay2.hex,
      },
      typography: {
        body: variant.text.hex,
        heading: variant.text.hex,
        subHeading: variant.subtext0.hex,
        label: variant.subtext1.hex,
        subtle: variant.overlay0.hex,
        link: variant.blue.hex,
        success: variant.green.hex,
        warning: variant.yellow.hex,
        error: variant.red.hex,
        tag: variant.blue.hex,
        selection: createAlpha(variant.surface2.hex, 0.5),
        cursor: variant.rosewater.hex,
      },
    },
  };
};

export const createThemeVariant = (flavor: FlavorName) => {
  return createTheme(vars, createThemeBase(flavor));
};
