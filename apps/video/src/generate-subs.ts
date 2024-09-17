import {
  convertToCaptions,
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
} from "@remotion/install-whisper-cpp";
import { writeFile } from "fs/promises";
import path from "path";

console.log("generate-subs.ts");
const whisperPath = path.join(process.cwd(), "whisper.cpp");

await installWhisperCpp({
  to: whisperPath,
  version: "1.5.5",
});

await downloadWhisperModel({
  model: "medium.en",
  folder: whisperPath,
});

const inputPath = path.join(process.cwd(), "in/output_audio.wav");

console.log(inputPath);

const result = await transcribe({
  model: "medium.en",
  whisperPath,
  inputPath,
  tokenLevelTimestamps: true,
});

const { captions } = convertToCaptions({
  transcription: result.transcription,
  combineTokensWithinMilliseconds: 1000,
});

await writeFile(
  "transcription.json",
  JSON.stringify({ ...result, transcription: captions }, null, 2),
);
