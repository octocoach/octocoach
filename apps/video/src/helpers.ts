import { ColorName, flavors } from "@catppuccin/palette";

export const c = (colorName: ColorName) => flavors.mocha.colors[colorName].hex;
