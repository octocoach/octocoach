import { Daily } from ".";

const daily = new Daily();

const transcripts = await daily.listTranscripts({
  meetingId: "c6104840-6ad5-4a41-b08a-ef8a3472c37f",
});

console.log(transcripts);

for (const transcript of transcripts) {
  const meeting = await daily.getMeeting(transcript.mtgSessionId);
  console.log(meeting);

  const start = new Date(meeting.start_time * 1000);
  const end = new Date(meeting.end_time * 1000);

  console.log("start", start);
  console.log("end", end);
}
