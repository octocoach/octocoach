import { ColorName, flavors } from "@catppuccin/palette";

export const c = (colorName: ColorName) => flavors.mocha.colors[colorName].hex;

export const makePulse = ({
  frame,
  fps,
  speed,
}: {
  frame: number;
  fps: number;
  speed: number;
}) => Math.abs(Math.sin((Math.PI * frame) / (fps * speed)));
