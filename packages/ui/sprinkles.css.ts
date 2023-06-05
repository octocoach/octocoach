import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const base = 4;
const ratio = (1 + Math.sqrt(5)) / 2;

let c = base;
export let space: Record<number, number> = {};
for (let i = 0; i <= 8; i++) {
  space[i] = Math.round(c);
  c *= ratio;
}

Array(10).map((i, c) => console.log(i, c));

const responsiveProps = defineProperties({
  properties: {
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
  },
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

export const sprinkles = createSprinkles(responsiveProps);
