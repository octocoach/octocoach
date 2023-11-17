import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";
import { sprinkles } from "../sprinkles.css";

export const comboboxPopover = style([
  {
    display: "flex",
    maxHeight: "min(var(--popover-available-height, 300px), 300px)",
    flexDirection: "column",
    backgroundColor: vars.color.background.base.normal,
    borderRadius: 6,
    boxShadow: `
          -10px 0px 20px ${vars.color.brand[20]},
          10px 0px 20px ${vars.color.accent[20]};`,
    overflow: "auto",
  },
  sprinkles({
    paddingX: 2,
    paddingY: 2,
    gap: 3,
  }),
]);

export const comboboxItem = style([
  {
    cursor: "pointer",
    ":hover": {
      backgroundColor: vars.color.brand[20],
    },
    selectors: {
      "&[data-active-item]": {
        backgroundColor: vars.color.brand[50],
      },
    },
  },
]);
