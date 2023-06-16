import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme.css";
import { space } from "../sprinkles.css";

export const card = recipe({
  base: {
    background: vars.color.surface[0],
    borderRadius: space[1],
    padding: space[4],
    width: "100%",
  },
});
