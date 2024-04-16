import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../theme.css";

export const fileSelectContainer = style({
  overflow: "visible",
});

globalStyle(`${fileSelectContainer} input[type="file"]::file-selector-button`, {
  borderRadius: 6,
  cursor: "pointer",
  fontFamily: vars.fonts.base,
  fontSize: "1rem",
  fontVariationSettings: '"CASL" 0',
  fontWeight: 400,
  padding: "12px 24px",
  transition: "all 1s",
  width: "fit-content",
  background: vars.color.background.base.normal,
  border: `2px solid ${vars.color.brand[50]}`,
  color: vars.color.typography.body,
});
