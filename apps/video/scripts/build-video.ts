import { openai } from "@ai-sdk/openai";
import { panelSchema, sequenceSchema } from "@src/Sequence";
import { generateObject } from "ai";
import { writeFile } from "fs/promises";
import { z } from "zod";

import { courseInfo } from "./prompts";

const availablePanels = [...panelSchema.optionsMap.keys()].join(", ");

console.log(availablePanels);

console.log("Building video...");

const { object } = await generateObject({
  model: openai("gpt-4o"),
  schema: z.object({
    video: sequenceSchema,
  }),
  prompt: [
    "Create a short, engaging promotional video.",
    "The video should promote the AI Web App Development course by Q15.",
    `"""`,
    courseInfo,
    `"""`,
    "The video would be either 1920x1080, 1080x1920, or 1080x1080.",
    "So widths should be 1920, 1080, or 1080 divided by the number of panels. With a little less for padding.",
    "Font sizes should be around 50-100.",
    `Use only the following options for panel types: ${availablePanels}`,
  ].join("\n"),
});

console.log("Writing video.json...");

await writeFile(
  "src/videoData/video.json",
  JSON.stringify(object.video, null, 2),
);

console.log("Done!");
