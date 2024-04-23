import { Daily } from ".";

const daily = new Daily();

const transcripts = await daily.listTranscripts({ roomName: "kdz-uov-axf" });

for (const transcript of transcripts) {
  const link = await daily.getTranscriptLink(transcript.transcriptId);

  console.log(link);

  const res = await fetch(link);

  const text = await res.text();

  console.log(text);
}
