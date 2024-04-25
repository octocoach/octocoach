import { Daily } from ".";
import { WebVTT } from "./webvtt";

const daily = new Daily();

const transcripts = await daily.listTranscripts({ roomName: "gfa-amq-rlg" });

console.log(transcripts);

for (const transcript of transcripts) {
  const link = await daily.getTranscriptLink(transcript.transcriptId);

  const res = await fetch(link);

  const text = await res.text();

  const webVTT = new WebVTT(text);

  console.log(webVTT.clean());
}
