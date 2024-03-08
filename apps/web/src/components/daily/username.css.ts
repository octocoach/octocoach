import { sprinkles, style, vars } from "@octocoach/ui/vanilla-extract";

export const usernameClass = style([
  {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: vars.color.background.base[80],
    borderRadius: ".25rem",
  },
  sprinkles({ paddingX: 2 }),
]);
