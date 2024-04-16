import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { space } from "../sprinkles.css";
import { vars } from "../theme.css";

export const tag = recipe({
  base: {
    padding: space[2],
    lineHeight: 1,
    borderRadius: space[4],
    borderColor: vars.color.typography.subtle,
    borderWidth: 1,
  },
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
});

export type TagVariants = RecipeVariants<typeof tag>;
