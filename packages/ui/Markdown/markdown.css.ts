import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const markdown = style({
  fontFamily: vars.fonts.base,
  color: vars.color.typography.body,
});

globalStyle(`${markdown} h1`, {
  fontSize: "2rem",
  fontWeight: 700,
  margin: "1rem 0",
});

globalStyle(`${markdown} h2`, {
  fontSize: "1.5rem",
  fontWeight: 700,
  margin: "1rem 0",
});

globalStyle(`${markdown} h3`, {
  fontSize: "1.25rem",
  fontWeight: 700,
  margin: "1rem 0",
});

globalStyle(`${markdown} ul`, {
  listStylePosition: "outside",
  paddingLeft: "1rem",
});

globalStyle(`${markdown} li`, {
  listStyleType: "square",
  margin: "0.5rem 0",
});

globalStyle(`${markdown} p:not(:last-of-type)`, {
  marginBottom: "1rem",
});

globalStyle(`${markdown} a`, {
  color: vars.color.accent.normal,
  textDecoration: "underline",
  textDecorationStyle: "wavy",
  textDecorationColor: vars.color.accent.normal,
});
