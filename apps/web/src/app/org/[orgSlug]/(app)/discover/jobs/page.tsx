import { Card, Stack, Text } from "@octocoach/ui";
import { getMatchingJobs } from "../helpers";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const jobs = await getMatchingJobs(params.orgSlug);

  return (
    <Stack>
      {jobs.map((job) => (
        <Card key={job.jobId}>
          <Stack>
            <Text>{job.jobTitle}</Text>
            <Text size="s">
              {job.employerName} - {job.location}
            </Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
