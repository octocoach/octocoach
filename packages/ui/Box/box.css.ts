import { style } from "@vanilla-extract/css";
import { RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { sprinkles } from "../sprinkles.css";

const sizes = {
  none: "0px",
  extraSmall: sprinkles({ padding: 1 }),
  small: sprinkles({ padding: 3 }),
  medium: sprinkles({ padding: 6 }),
  large: sprinkles({ padding: 8 }),
  extraLarge: sprinkles({ padding: 10 }),
};

export const box = recipe({
  variants: {
    padding: sizes,
    paddingX: sizes,
    paddingY: sizes,
    margin: sizes,
    marginX: sizes,
    marginY: sizes,
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
  },
  defaultVariants: {
    justifyItems: "left",
    display: "block",
    textAlign: "left",
    padding: "medium",
    margin: "none",
  },
});

export type BoxVariants = RecipeVariants<typeof box>;
