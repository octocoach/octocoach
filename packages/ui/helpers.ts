import { colord } from "colord";

export const createAlpha = (color: string, alpha: number) =>
  colord(color).alpha(alpha).toHslString();
