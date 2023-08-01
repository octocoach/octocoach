import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const progress = style({
  appearance: "none",
  height: 5,
  width: "100%",
  backgroundColor: "transparent",

  "::-webkit-progress-value": {
    backgroundColor: vars.color.brand.normal,
    borderRadius: 10,
  },
  "::-webkit-progress-bar": {
    backgroundColor: "transparent",
  },
});
