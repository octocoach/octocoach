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
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 0,
  gap: space[2],
  height: "2.5rem",
});

export const selectPopover = style([
  {
    display: "flex",
    maxHeight: "min(var(--popover-available-height, 300px), 300px)",
    minWidth: "max(var(--popover-anchor-width, 100px), 100px)",
    maxWidth: "var(--popover-available-width, 100%)",
    flexDirection: "column",
    backgroundColor: vars.color.background.base.normal,
    borderRadius: 6,
    boxShadow: `
      -10px 0px 20px ${vars.color.brand[20]},
      10px 0px 20px ${vars.color.accent[20]};`,
    overflow: "auto",
    zIndex: 2,
  },
  sprinkles({
    paddingX: 2,
    paddingY: 2,
    gap: 3,
  }),
]);

const activeItem = {
  fontWeight: 700,
  fontVariationSettings: '"CASL" 1',
  backgroundColor: vars.color.surface[0],
};

export const selectItem = style([
  {
    transition: "all 0.3s",
    cursor: "pointer",
    borderRadius: 6,
    ":hover": activeItem,

    ":focus": activeItem,

    ":active": activeItem,
    selectors: {
      "&[data-active-item]": activeItem,
    },
  },
  sprinkles({
    paddingX: 1,
    paddingY: 2,
  }),
]);
