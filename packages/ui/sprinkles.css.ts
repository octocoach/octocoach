import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const base = 0.25;
const ratio = (1 + Math.sqrt(5)) / 2;

let prev: number = base;

export let space = Object.fromEntries(
  Array.from(Array(10).keys()).map((i) => {
    const c = prev;
    prev *= ratio;
    return [(i + 1) as Space, `${c.toFixed(2)}rem`];
  })
) as Record<Space, string>;

const responsiveProps = defineProperties({
  properties: {
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    gap: space,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
  },
});

export const sprinkles = createSprinkles(responsiveProps);
