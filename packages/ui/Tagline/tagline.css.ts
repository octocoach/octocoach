import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../theme.css";

export const tagline = style({
  fontFamily: vars.fonts.base,
  fontSize: "2rem",
  fontWeight: 900,
  color: vars.color.typography.heading,
});

globalStyle(`${tagline} strong`, {
  textDecoration: "underline",
  textDecorationStyle: "wavy",
  fontWeight: 900,
  textDecorationColor: vars.color.typography.error,
});
