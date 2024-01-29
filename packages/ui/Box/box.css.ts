import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "../sprinkles.css";
import { vars } from "../theme.css";

const mkSizes = (key: string) =>
  ({
    none: "0px",
    extraSmall: sprinkles({ [key]: 1 }),
    small: sprinkles({ [key]: 3 }),
    medium: sprinkles({ [key]: 6 }),
    large: sprinkles({ [key]: 8 }),
    extraLarge: sprinkles({ [key]: 10 }),
  } as const);

const sizes = {
  paddingX: mkSizes("paddingX"),
  paddingY: mkSizes("paddingY"),
  marginX: mkSizes("marginX"),
  marginY: mkSizes("marginY"),
} as const;

export const box = recipe({
  variants: {
    ...sizes,
    textAlign: {
      left: style({ textAlign: "left" }),
      center: style({ textAlign: "center" }),
      right: style({ textAlign: "right" }),
    },
    display: {
      block: style({ display: "block" }),
      inline: style({ display: "inline" }),
      inlineBlock: style({ display: "inline-block" }),
      flex: style({ display: "flex" }),
    },
    justifyItems: {
      left: style({ justifyItems: "left" }),
      center: style({ justifyItems: "center" }),
      right: style({ justifyItems: "right" }),
    },
    alignItems: {
      left: style({ alignItems: "left" }),
      center: style({ alignItems: "center" }),
      right: style({ alignItems: "right" }),
    },
    flexDirection: {
      row: style({ flexDirection: "row" }),
      column: style({ flexDirection: "column" }),
    },
    grow: {
      true: {
        flexGrow: 1,
      },
    },
    backgroundColor: {
      transparent: style({ backgroundColor: "transparent" }),
      base: style({ backgroundColor: vars.color.background.base.normal }),
      manlte: style({ backgroundColor: vars.color.background.mantle.normal }),
      crust: style({ backgroundColor: vars.color.background.crust.normal }),
    },
  },
  defaultVariants: {
    backgroundColor: "transparent",
    justifyItems: "left",
    display: "block",
    textAlign: "left",
    paddingX: "none",
    paddingY: "none",
    marginX: "none",
    marginY: "none",
  },
});

export type BoxVariants = RecipeVariants<typeof box>;
