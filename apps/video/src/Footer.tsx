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

export const Footer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          <BaLogo width={300} />
        </div>
        <Img src={staticFile("images/certqua_measure_l.png")} width={250} />
        <div style={{ position: "relative" }}>
          <h1 style={{ fontSize: 60 }}>
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
            <Cursor size={100} />
          </Sequence>
        </div>
      </div>
    </Sequence>
  );
};
