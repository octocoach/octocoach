import "./global.css";

import { Composition } from "remotion";

import { Advert, advertDefaultProps, advertSchema } from "./Advert";
import { CourseData, CourseTile, courseTileCompSchema } from "./CourseTile";
import {
  calculateTestimonialsMetadata,
  Testimonials,
  testimonialsSchema,
} from "./Testimonials";

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
        id="Portrait"
        component={CourseTile}
        durationInFrames={durationInSeconds * fps}
        fps={fps}
        width={1080}
        height={1920}
        schema={courseTileCompSchema}
        defaultProps={{
          layout: "portrait",
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
        defaultProps={advertDefaultProps}
      />
    </>
  );
};
