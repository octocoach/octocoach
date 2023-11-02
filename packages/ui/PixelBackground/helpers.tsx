import { themeValue } from "../theme.css";
import { Flavor } from "../theme/creator";

export const makePixelBackground = ({
  el,
  pixelSize,
  flavor = "mocha",
}: {
  el: HTMLDivElement;
  pixelSize: number;
  flavor?: Flavor;
}) => {
  const imageWidth = el?.clientWidth || 0;
  const imageHeight = el?.clientHeight || 0;
  const theme = themeValue[flavor];

  let rects: string[] = [];

  for (let x = 0; x < imageWidth; x += pixelSize) {
    for (let y = 0; y < imageHeight; y += pixelSize) {
      const rnd = Math.random();

      if (rnd > 0.8) {
        const fill =
          rnd > 0.9
            ? theme.color.background.crust
            : theme.color.background.mantle;
        rects.push(
          `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${fill}" />`
        );
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}" >
    ${rects.join()}
  </svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
