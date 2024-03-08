import { style } from "@vanilla-extract/css";

export const calendarContainer = style({
  display: "grid",
  placeItems: "center",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 6,
});
