import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const textareaContainer = style({
  color: vars.color.typography.label,
  display: "flex",
  flexDirection: "column",
  fontFamily: vars.fonts.base,
  gap: 8,
  width: "100%",
});

export const textarea = style({
  backgroundColor: vars.color.background.mantle,
  border: `1px solid ${vars.color.surface[1]}`,
  borderRadius: 6,
  color: vars.color.typography.body,
  fontFamily: vars.fonts.base,
  fontVariationSettings: '"MONO" 1',
  height: "5rem",
  resize: "none",
  ":focus": {
    border: `1px solid ${vars.color.brand}`,
    outline: vars.color.brand,
  },
});
