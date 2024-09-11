import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { ReactNode, useEffect } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const Layout = ({
  children,
  image,
  panDuration,
  layout,
}: {
  children: ReactNode;
  image: string;
  panDuration: number;
  layout: "square" | "portrait";
}) => {
  const frame = useCurrentFrame();

  const pos = interpolate(
    frame,
    [0, panDuration],
    [0, layout === "square" ? 100 : 50],
    {
      easing: Easing.inOut(Easing.ease.bind(Easing)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const { LL } = useI18nContext();

  useEffect(() => {
    console.log("hello");
    console.log(LL.measures.heading());
  }, [LL]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: layout === "square" ? "1fr 40%" : "1fr",
          gridTemplateRows: layout === "portrait" ? "1fr 20%" : "1fr",
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
            borderBottomLeftRadius: layout === "square" ? 80 : 0,
            borderTopRightRadius: layout === "portrait" ? 80 : 0,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile(`images/${image}`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition:
                layout === "square" ? `${pos}% 50%` : `50% ${pos}%`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
