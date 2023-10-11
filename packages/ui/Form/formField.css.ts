import { style } from "@vanilla-extract/css";
import { space } from "../sprinkles.css";

export const formField = style({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
});
