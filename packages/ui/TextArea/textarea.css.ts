import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const textareaContainer = style({
  display: "flex",
  flexDirection: "column",
  fontFamily: vars.fonts.base,
  gap: 8,
  width: "100%",
});

export const textarea = style({
  borderColor: vars.color.accent,
  borderRadius: 6,
  fontFamily: vars.fonts.base,
  fontVariationSettings: '"MONO" 1',
  height: "5rem",
  resize: "none",
  ":focus": {
    borderColor: vars.color.brand,
    outline: vars.color.brand,
  },
});
