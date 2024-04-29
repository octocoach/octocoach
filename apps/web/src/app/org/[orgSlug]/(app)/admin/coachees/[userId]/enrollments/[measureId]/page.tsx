import { getLocale } from "@helpers/locale";
import { Daily } from "@octocoach/daily";
import { orgDb } from "@octocoach/db/connection";
import { getFirstRow } from "@octocoach/db/helpers/rows";
import { and, eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Box, Card, Text } from "@octocoach/ui";

export default async function Page({
  params: { orgSlug, userId, measureId },
}: {
  params: { orgSlug: string; userId: string; measureId: string };
}) {
  const locale = getLocale();

  const db = orgDb(orgSlug);
  const { enrollmentTable, measureTable, measureInfoTable } =
    mkOrgSchema(orgSlug);

  const enrollment = await db
    .select({
      status: enrollmentTable.status,
      title: measureInfoTable.title,
      roomName: enrollmentTable.roomName,
    })
    .from(enrollmentTable)
    .innerJoin(measureTable, eq(measureTable.id, enrollmentTable.measure))
    .innerJoin(
      measureInfoTable,
      and(
        eq(measureInfoTable.id, measureTable.id),
        eq(measureInfoTable.locale, locale)
      )
    )
    .where(
      and(
        eq(enrollmentTable.coachee, userId),
        eq(enrollmentTable.measure, measureId)
      )
    )
    .then((rows) => getFirstRow(rows));

  let transcriptContent = "";

  if (enrollment.roomName) {
    const daily = new Daily();

    const transcripts = await daily.listTranscripts({
      roomName: enrollment.roomName,
    });

    console.log(transcripts);

    for (const transcript of transcripts) {
      const content = await daily.getTranscriptContent(transcript.transcriptId);
      transcriptContent += content;
    }
  }

  return (
    <Box>
      <Text size="l">{enrollment.title}</Text>
      <Text>Status: {enrollment.status}</Text>
      <Card>
        <pre>{transcriptContent}</pre>
      </Card>
    </Box>
  );
}
