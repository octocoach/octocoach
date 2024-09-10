import "./global.css";

import { Composition } from "remotion";

import { compSchema, MyComposition } from "./Composition";

const fps = 30;
const durationInSeconds = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={durationInSeconds * fps}
        fps={fps}
        width={1920}
        height={1920}
        schema={compSchema}
        defaultProps={{
          text: "Quietscheentchen",
        }}
      />
    </>
  );
};
