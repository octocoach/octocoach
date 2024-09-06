import { ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SideBySide = ({ children }: { children: ReactNode }) => {
  const frame = useCurrentFrame();

  const xPos = interpolate(frame, [0, 30], [0, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 40%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
        <div
          style={{
            borderTopLeftRadius: 80,
            borderBottomLeftRadius: 80,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("image.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${xPos}% 50%`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
