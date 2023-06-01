import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";
import { style } from "@vanilla-extract/css";

export const textareaContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const textarea = style({
  borderColor: vars.color.accent,
  resize: "none",
  borderRadius: 6,
  ":focus": {
    borderColor: vars.color.brand,
    outline: "none",
  },
});
