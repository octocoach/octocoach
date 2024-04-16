import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

import { sprinkles } from "../sprinkles.css";

export const container = recipe({
  base: [sprinkles({ paddingX: 4 })],
  variants: {
    width: {
      fullWidth: {
        width: "100%",
      },
      contained: {
        maxWidth: "64rem",
        margin: "0 auto",
      },
    },
  },
  defaultVariants: {
    width: "fullWidth",
  },
});

export type ContainerVariants = RecipeVariants<typeof container>;
