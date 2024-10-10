import { style } from "@vanilla-extract/css";

import { vars } from "../theme.css";

export const toastClass = style({
  fontFamily: vars.fonts.base,
  backgroundColor: vars.color.surface[1],
  color: vars.color.typography.body,
  borderColor: vars.color.brand.normal,
  borderWidth: 4,
});
