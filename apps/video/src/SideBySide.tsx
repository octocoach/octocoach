import { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SideBySide = ({
  children,
  image,
  panDuration,
}: {
  children: ReactNode;
  image: string;
  panDuration: number;
}) => {
  const frame = useCurrentFrame();

  const xPos = interpolate(frame, [0, panDuration], [0, 100], {
    easing: Easing.inOut(Easing.ease.bind(Easing)),
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
            justifyContent: "space-evenly",
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
            src={staticFile(`images/${image}`)}
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
