import { variants } from "@catppuccin/palette";
import { createTheme } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const latteThemeClass = createTheme(vars, {
  color: {
    brand: variants.latte.mauve.hsl,
    accent: variants.latte.sapphire.hsl,
  },
});
