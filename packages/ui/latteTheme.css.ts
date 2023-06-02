import { variants } from "@catppuccin/palette";
import { createTheme } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const latteThemeClass = createTheme(vars, {
  fonts: {
    base: "'Recursive', sans-serif",
  },

  color: {
    brand: variants.latte.mauve.hsl,
    accent: variants.latte.sapphire.hsl,
  },
});
