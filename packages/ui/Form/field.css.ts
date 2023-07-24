import { style } from "@vanilla-extract/css";
import { space, sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
});

export const input = style([
  {
    height: "2.5rem",
    backgroundColor: vars.color.background.mantle,
    borderRadius: space[2],
    borderWidth: 0,
    color: vars.color.typography.body,
    fontFamily: vars.fonts.base,
    fontVariationSettings: "'CASL' 1",

    ":focus-visible": {
      outlineWidth: 1,
      outlineColor: vars.color.accent.normal,
    },
  },
  sprinkles({
    paddingX: 1,
  }),
]);
