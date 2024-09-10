import "./global.css";

import { loadAllLocalesAsync } from "@octocoach/i18n/src/i18n-util.async";
import { useEffect, useState } from "react";
import { Composition } from "remotion";

import { compSchema, MyComposition } from "./Composition";

const fps = 30;
const durationInSeconds = 30;

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
            text: "Quietscheentchen",
            layout: "square",
            locale: "de",
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
            text: "Quietscheentchen",
            layout: "portrait",
            locale: "en",
          }}
        />
      </>
    )
  );
};
