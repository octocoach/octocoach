import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const markdown = style({
  fontFamily: vars.fonts.base,
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
  listStyle: "inside",
});

globalStyle(`${markdown} li`, {
  listStyleType: "disc",
  margin: "0.5rem 0",
});

globalStyle(`${markdown} p`, {
  margin: "1rem 0",
});

globalStyle(`${markdown} a`, {
  color: vars.color.accent.normal,
  textDecoration: "underline",
  textDecorationStyle: "wavy",
  textDecorationColor: vars.color.accent.normal,
});
