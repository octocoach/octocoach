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
import { Layout } from "./Layout";
import { Logo } from "./Logo";
import { Numeronym } from "./Numeronym";
import { Title } from "./Title";

const CourseData = z.discriminatedUnion("locale", [
  z.object({
    locale: z.literal("en"),
    type: z.enum(["Course", "Workshop"]),
    mode: z.enum(["Full-time", "Part-time"]),
    fullyRemote: z.boolean(),
    dates: z.object({
      start: z.string(),
      end: z.string(),
    }),
  }),
  z.object({
    locale: z.literal("de"),
    type: z.enum(["Kurs", "Workshop"]),
    modus: z.enum(["Vollzeit", "Teilzeit"]),
    fullyRemote: z.boolean(),
    termine: z.object({
      beginn: z.string(),
      ende: z.string(),
    }),
  }),
]);

export type CourseData = z.infer<typeof CourseData>;

export const compSchema = z.object({
  layout: z.enum(["square", "portrait"]),
  title: z.string().min(3),
  animatedLogo: z.boolean(),
  courseData: CourseData,
});

const companyName = "Quietscheentchen";

export const MyComposition = ({
  layout,
  title,
  animatedLogo,
  courseData,
}: z.infer<typeof compSchema>) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = animatedLogo
    ? interpolate(frame, [5, 30], [0, 1], {
        easing: Easing.inOut(Easing.ease.bind(Easing)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <TypesafeI18n locale={courseData.locale}>
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
            <Numeronym text={companyName} progress={progress} />
          </div>

          <Title text={title} />

          <Json data={courseData} />

          <Footer />
        </Layout>
      </AbsoluteFill>
    </TypesafeI18n>
  );
};
