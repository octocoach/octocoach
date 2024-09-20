import { translateY } from "@remotion/animation-utils";
import {
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { BaLogo } from "./BALogo";
import { Cursor } from "./Cursor";
import { c } from "./helpers";
import { useIsPortrait } from "./hooks";

export const Footer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isPortrait = useIsPortrait();

  const pos = interpolate(frame, [0, 3 * fps], [1000, 0], {
    easing: Easing.elastic(3),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transform = translateY(pos);

  return (
    <Sequence name="Footer" layout="none">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          justifyContent: "space-evenly",
          width: "100%",
          transform,
        }}
      >
        <div>
          <BaLogo width={isPortrait ? 300 : 150} />
        </div>
        <Img
          src={staticFile("images/certqua_measure_l.png")}
          width={isPortrait ? 250 : 150}
        />
        <div style={{ position: "relative" }}>
          <h1 style={{ fontSize: isPortrait ? 60 : 30 }}>
            <a href="#" style={{ color: c("blue") }}>
              q15.co
            </a>
          </h1>

          <Sequence
            name="Cursor"
            layout="none"
            from={120}
            durationInFrames={200}
          >
            <Cursor size={isPortrait ? 100 : 50} />
          </Sequence>
        </div>
      </div>
    </Sequence>
  );
};
