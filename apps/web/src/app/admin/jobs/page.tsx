import Logo from "@components/logo";
import { db } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const jobs = await db.query.jobTable.findMany({
    with: {
      employer: true,
      tasks: {
        with: {
          skillsTasks: {
            with: {
              skill: true,
            },
          },
        },
      },
    },
  });

  return (
    <Container element="section">
      <Text size="xl" variation="casual" weight="bold">
        <Message id="JOBS" />
      </Text>
      <Stack>
        {jobs.map((job) => (
          <Card key={job.id}>
            <Stack direction="horizontal">
              <Logo employer={job.employer} size={100} />

              <Stack direction="vertical" spacing="tight">
                <Link href={`/admin/jobs/${job.id}`} key={job.id}>
                  <Text size="l" weight="bold">
                    {job.title}
                  </Text>
                </Link>
                <Text variation="casual">{job.employer.name}</Text>
                <Text size="s" weight="light">
                  {job.location}
                </Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
