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
        defaultProps={data[1]}
      />

      <Composition
        id="Sequence"
        component={Seq}
        fps={fps}
        width={1080}
        height={1080}
        durationInFrames={30 * fps}
        schema={sequenceSchema}
        calculateMetadata={calculateSequenceMetadata}
        defaultProps={{
          items: [
            {
              type: "animatedEmoji" as const,
              props: {
                emoji: "mechanicalArm" as const,
                durationInSeconds: 2,
                width: 500,
                playbackRate: 1,
              },
            },
            {
              type: "words" as const,
              props: { text: "The goose is loose!", wpm: 200 },
            },
          ],
        }}
      />
    </>
  );
};
