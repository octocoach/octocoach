import { Daily } from "@octocoach/daily";
import { Text } from "@octocoach/ui";
import { format } from "date-fns";

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

  const transcripts = await daily.listTranscripts({ meetingId });

  const startTime = new Date(meeting.start_time * 1000);
  const endTime = new Date(meeting.end_time * 1000);

  return (
    <div>
      <pre>{JSON.stringify(meeting, null, 2)}</pre>
      <pre>{JSON.stringify(transcripts, null, 2)}</pre>
      <Text>{format(startTime, "HH:mm:ss")}</Text>
      <Text>{format(endTime, "HH:mm:ss")}</Text>
    </div>
  );
}
