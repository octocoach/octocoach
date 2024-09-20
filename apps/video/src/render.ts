import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

import { data } from "./videoData/advert";

type VideoAspectRations = "portrait" | "landscape" | "square";

type VideoResolution =
  | {
      width: 1080;
      height: 1080 | 1920;
    }
  | {
      width: 1920;
      height: 1080;
    };

const videoSizes: Record<VideoAspectRations, VideoResolution> = {
  portrait: {
    width: 1080,
    height: 1920,
  },
  landscape: {
    width: 1920,
    height: 1080,
  },
  square: {
    width: 1080,
    height: 1080,
  },
};

console.log("Bundling");

const bundleLocation = await bundle({
  entryPoint: "./src/index.ts",
});

console.log("Bundled at", bundleLocation);

for (const inputProps of data) {
  console.log(`Rendering Locale ${inputProps.locale}`);

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "Advert",
    inputProps,
  });

  for (const [layout, { width, height }] of Object.entries(videoSizes)) {
    console.log(`Rendering ${layout} video`);
    await renderMedia({
      composition: { ...composition, height, width },
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: `out/${composition.id}_${inputProps.locale}_${layout}.mp4`,
      inputProps,
      logLevel: "verbose",
      timeoutInMilliseconds: 1000 * 60 * 60,
    });
  }
}

console.log("Done");
