import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const timeslotsContainer = style({});

export const timeslotsContent = style({
  borderColor: vars.color.overlays[0],
  borderWidth: 2,
  borderStyle: "solid",
  borderRadius: 6,
  display: "flex",
  flexDirection: "column",
  maxHeight: 254,
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.surface[2]} ${vars.color.surface[0]}`,
  gap: 2,
  padding: 2,
  "@container": {
    "(max-width: 500px)": {
      justifyContent: "center",
      maxHeight: "unset",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
});
