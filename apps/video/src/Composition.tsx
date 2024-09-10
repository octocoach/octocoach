import TypesafeI18n from "@octocoach/i18n/src/i18n-react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

import { Footer } from "./Footer";
import { c } from "./helpers";
import { Json } from "./Json";
import { Logo } from "./Logo";
import { Numeronym } from "./Numeronym";
import { Layout } from "./SideBySide";

export const compSchema = z.object({
  text: z.string(),
  layout: z.enum(["square", "portrait"]),
  locale: z.enum(["en", "de"]),
});

export const MyComposition = ({
  text,
  layout,
  locale,
}: z.infer<typeof compSchema>) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [5, 30], [0, 1], {
    easing: Easing.inOut(Easing.ease.bind(Easing)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <TypesafeI18n locale={locale}>
      <AbsoluteFill
        style={{
          fontFamily: `var(--font-recursive)`,
          backgroundColor: c("crust"),
          color: c("text"),
          placeContent: "center",
          placeItems: "center",
        }}
      >
        <Layout layout={layout} image="3.jpg" panDuration={durationInFrames}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Logo durationInFrames={30} size={100} />
            <Numeronym text={text} progress={progress} />
          </div>

          <Json
            data={{
              type: "Course",
              mode: "Full-time",
              start: "2024-11-04",
              end: "2025-02-26",
            }}
          />

          <Footer />
        </Layout>
      </AbsoluteFill>
    </TypesafeI18n>
  );
};
