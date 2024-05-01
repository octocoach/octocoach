import { getLocale as getNextLocale } from "@helpers/locale";
import { getBaseUrl } from "@helpers/navigation";
import { Daily } from "@octocoach/daily";
import { Box, Card, Stack, Text } from "@octocoach/ui";
import { getLocale } from "@octocoach/ui/Scheduler/helpers";
import { format } from "date-fns";
import Link from "next/link";

export default async function Meetings({
  roomName,
  userId,
  measureId,
}: {
  roomName: string;
  userId: string;
  measureId: string;
}) {
  const daily = new Daily();
  const locale = getLocale(getNextLocale());
  const baseUrl = getBaseUrl();

  const meetings = await daily.listMeetings({ roomName });
  return (
    <Box>
      <Text size="l">Meetings</Text>
      <Stack>
        {meetings.map((meeting) => {
          const start = new Date(meeting.start_time * 1000);

          return (
            <Card key={meeting.id}>
              <Link
                href={`${baseUrl}admin/coachees/${userId}/enrollments/${measureId}/meetings/${meeting.id}`}
              >
                {format(start, "yyyy.MM.dd HH:mm", { locale })}
              </Link>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
