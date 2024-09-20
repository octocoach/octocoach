import { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";

export const imagePanLayoutSchema = z.object({
  image: z.string(),
  panDuration: z.number(),
  layout: z.enum(["square", "portrait"]),
  imagePercentage: z.number(),
});

export const ImagePanLayout = ({
  children,
  image,
  panDuration,
  layout,
  imagePercentage,
}: {
  children: ReactNode;
} & z.infer<typeof imagePanLayoutSchema>) => {
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

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns:
            layout === "square" ? `1fr ${imagePercentage}%` : "1fr",
          gridTemplateRows:
            layout === "portrait" ? `1fr ${imagePercentage}%` : "1fr",
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
