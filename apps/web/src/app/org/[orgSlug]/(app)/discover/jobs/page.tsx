import { Breadcrumbs } from "@components/breadcrumbs";
import { getBaseUrl } from "@helpers/navigation";
import { Card, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

import { getMatchingJobs } from "../helpers";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const jobs = await getMatchingJobs(params.orgSlug);

  const baseUrl = getBaseUrl();

  return (
    <Stack>
      <Breadcrumbs baseUrl={baseUrl} crumbs={["discover", "jobs"]} />
      <Stack direction="horizontal">
        <Text size="l">Possible Matching Jobs</Text>
      </Stack>
      <Stack>
        {jobs.map((job) => (
          <Link href={`${baseUrl}discover/jobs/${job.jobId}`} key={job.jobId}>
            <Card>
              <Stack>
                <Text>{job.jobTitle}</Text>
                <Text size="s">
                  {job.employerName} - {job.location}
                </Text>
              </Stack>
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
