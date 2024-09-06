import "./global.css";

import { Composition } from "remotion";

import { compSchema, MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={120}
        fps={30}
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
