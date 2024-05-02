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
      <Text size="l" weight="semiBold" variation="casual">
        Meeting on {format(startTime, "yyyy.MM.dd")}
      </Text>
      <Text>
        {format(startTime, "HH:mm:ss")} to {format(endTime, "HH:mm:ss")}
      </Text>
      {transcripts.length ? (
        transcripts.map(({ transcriptId }) => (
          <Transcript key={transcriptId} id={transcriptId} />
        ))
      ) : (
        <Text size="s">No transcripts available</Text>
      )}
    </div>
  );
}
