import { Daily } from ".";

const daily = new Daily();

const transcripts = await daily.listTranscripts({ roomName: "gfa-amq-rlg" });

console.log(transcripts);

for (const transcript of transcripts) {
  const meeting = await daily.getMeeting(transcript.mtgSessionId);
  console.log(meeting);

  const start = new Date(meeting.start_time * 1000);
  const end = new Date(meeting.end_time * 1000);

  console.log("start", start);
  console.log("end", end);
}
