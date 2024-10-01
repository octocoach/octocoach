import "./global.css";

import { Composition } from "remotion";

import { Advert, advertSchema } from "./Advert";
import { CourseData, CourseTile, courseTileCompSchema } from "./CourseTile";
import {
  calculateSequenceMetadata,
  Sequence as Seq,
  sequenceSchema,
} from "./Sequence";
import {
  calculateTestimonialsMetadata,
  Testimonials,
  testimonialsSchema,
} from "./Testimonials";
import { data } from "./videoData/advert";

export const fps = 30;
const durationInSeconds = 30;

const courseData: CourseData = {
  locale: "de",
  data: {
    type: "Kurs",
    modus: "Vollzeit",
    remote: true,
    termine: {
      beginn: "2024-11-04",
      ende: "2025-02-26",
    },
  },
};

const title = "AI Web App Development";
const animatedLogo = false;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Square"
        component={CourseTile}
        durationInFrames={durationInSeconds * fps}
        fps={fps}
        width={1920}
        height={1920}
        schema={courseTileCompSchema}
        defaultProps={{
          layout: "square",
          title,
          animatedLogo,
          courseData,
        }}
      />

      <Composition
        id="Testimonials"
        component={Testimonials}
        fps={fps}
        durationInFrames={0}
        width={1080}
        height={1080}
        schema={testimonialsSchema}
        defaultProps={{ title: "Testimonials", subSections: [] }}
        calculateMetadata={calculateTestimonialsMetadata}
      />

      <Composition
        id="Advert"
        component={Advert}
        fps={fps}
        durationInFrames={30 * fps}
        width={1080}
        height={1920}
        schema={advertSchema}
        defaultProps={data[0]}
      />

      <Composition
        id="Sequence"
        component={Seq}
        fps={fps}
        width={1920}
        height={1080}
        durationInFrames={30 * fps}
        schema={sequenceSchema}
        calculateMetadata={calculateSequenceMetadata}
        defaultProps={{
          scenes: [
            {
              durationInFrames: 30,
              scenes: [
                {
                  type: "words",
                  props: {
                    text: ["Completed", "a bootcamp?"],
                    durationInFrames: 0,
                  },
                },
                {
                  type: "animatedEmoji" as const,
                  props: {
                    emoji: "graduationCap",
                    width: 300,
                    playbackRate: 2,
                  },
                },
              ],
            },
            {
              durationInFrames: 30,
              scenes: [
                {
                  type: "animatedEmoji" as const,
                  props: {
                    emoji: "unamused",
                    width: 300,
                    playbackRate: 2,
                  },
                },
                {
                  type: "words",
                  props: {
                    text: ["Still no Job?"],
                    durationInFrames: 0,
                  },
                },
              ],
            },
          ],
        }}
      />
    </>
  );
};
