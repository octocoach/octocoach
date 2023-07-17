import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import ReactMarkdown from "react-markdown";

export default async function Page() {
  const jobs = await db.query.jobs.findMany({
    with: {
      company: true,
      tasks: {
        with: {
          tasksToSkills: {
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
      <Text size="xl">Jobs</Text>
      <Stack>
        {jobs.map((job) => (
          <Link href={`/admin/jobs/${job.id}`} key={job.id}>
            <Card key={job.id}>
              <Text size="l">{job.title}</Text>
              <Text>{job.company.name}</Text>
              <Text size="s">{job.location}</Text>
            </Card>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
