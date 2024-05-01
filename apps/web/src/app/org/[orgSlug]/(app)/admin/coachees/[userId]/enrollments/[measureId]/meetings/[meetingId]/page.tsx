import { Daily } from "@octocoach/daily";
import { Text } from "@octocoach/ui";
import { format } from "date-fns";

import { Transcript } from "./transcript";

export default async function Page({
  params: { meetingId },
}: {
  params: {
    orgSlug: string;
    meetingId: string;
    measureId: string;
    userId: string;
  };
}) {
  const daily = new Daily();

  const meeting = await daily.getMeeting(meetingId);
  const startTime = new Date(meeting.start_time * 1000);
  const endTime = new Date(meeting.end_time * 1000);

  const transcripts = await daily.listTranscripts({ meetingId });

  return (
    <div>
      <Text>{format(startTime, "HH:mm:ss")}</Text>
      <Text>{format(endTime, "HH:mm:ss")}</Text>
      {transcripts.map(({ transcriptId }) => (
        <Transcript key={transcriptId} id={transcriptId} />
      ))}
    </div>
  );
}
