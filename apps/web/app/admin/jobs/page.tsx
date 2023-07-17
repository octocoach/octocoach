import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { Card, Container, Stack, Typography } from "@octocoach/ui";
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
      <Typography size="xl">Jobs</Typography>
      <Stack>
        {jobs.map((job) => (
          <Link href={`/admin/jobs/${job.id}`} key={job.id}>
            <Card key={job.id}>
              <Typography size="l">{job.title}</Typography>
              <Typography>{job.company.name}</Typography>
              <Typography size="s">{job.location}</Typography>
            </Card>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
