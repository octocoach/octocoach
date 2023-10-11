import { style } from "@vanilla-extract/css";
import { space, sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

export const select = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: space[2],
  fontFamily: vars.fonts.base,
  fontSize: "1rem",
});

export const selectButton = style({
  display: "flex",
  minWidth: "150px",
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 0,
  gap: space[2],
});

export const selectPopover = style([
  {
    display: "flex",
    maxHeight: "min(var(--popover-available-height, 300px), 300px)",
    flexDirection: "column",
    backgroundColor: vars.color.background.base,
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

export const selectItem = style([
  {
    cursor: "pointer",
    ":hover": {
      backgroundColor: vars.color.brand[50],
    },
  },
]);
