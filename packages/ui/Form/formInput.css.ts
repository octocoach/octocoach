import { style } from "@vanilla-extract/css";
import { space, sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

export const formInputWrapper = style([
  {
    display: "flex",
    alignItems: "center",
    gap: space[2],
    borderRadius: space[2],
    backgroundColor: vars.color.background.crust,
  },
]);

export const formInput = style([
  {
    flexGrow: 1,
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
