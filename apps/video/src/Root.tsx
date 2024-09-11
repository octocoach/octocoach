import "./global.css";

import { loadAllLocalesAsync } from "@octocoach/i18n/src/i18n-util.async";
import { useEffect, useState } from "react";
import { Composition } from "remotion";

import { compSchema, CourseData, MyComposition } from "./Composition";

const fps = 30;
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
  const [localesLoaded, setLocalesLoaded] = useState(false);

  useEffect(() => {
    void (async () => {
      await loadAllLocalesAsync();
      setLocalesLoaded(true);
    })();
  }, []);

  return (
    localesLoaded && (
      <>
        <Composition
          id="Square"
          component={MyComposition}
          durationInFrames={durationInSeconds * fps}
          fps={fps}
          width={1920}
          height={1920}
          schema={compSchema}
          defaultProps={{
            layout: "square",
            title,
            animatedLogo,
            courseData,
          }}
        />
        <Composition
          id="Portrait"
          component={MyComposition}
          durationInFrames={durationInSeconds * fps}
          fps={fps}
          width={1080}
          height={1920}
          schema={compSchema}
          defaultProps={{
            layout: "portrait",
            title,
            animatedLogo,
            courseData,
          }}
        />
      </>
    )
  );
};
