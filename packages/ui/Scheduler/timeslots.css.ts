import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const timeslotsContainer = style({
  display: "flex",
  flexDirection: "column",
  maxHeight: 240,
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.surface[2]} ${vars.color.surface[0]}`,
  gap: 2,
  padding: 2,
});
