import { ColorName, flavors } from "@catppuccin/palette";

export const c = (colorName: ColorName) => flavors.mocha.colors[colorName].hex;

export const accentColors = flavors.mocha.colorEntries
  .filter(([_name, { accent }]) => accent)
  .map(([_name, { hex }]) => hex);

export const makePulse = ({
  frame,
  fps,
  speed,
}: {
  frame: number;
  fps: number;
  speed: number;
}) => Math.abs(Math.sin((Math.PI * frame) / (fps * speed)));

export const exhaustiveCheck = (_: never): never => {
  throw new Error("Not all cases are handled");
};
