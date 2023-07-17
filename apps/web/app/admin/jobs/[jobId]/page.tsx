import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { jobSchema, jobs } from "@octocoach/db/src/schema/jobs";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Pill } from "./components";

export default async function Page({ params }: { params: { jobId: number } }) {
  const job = await db.query.jobs.findFirst({
    where: (jobs, { eq }) => eq(jobs.id, params.jobId),
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
    <Stack>
      <Link href="/admin/jobs">
        <Text>Jobs</Text>
      </Link>
      <Text size="l" weight="extraBold" variation="heading">
        {job.title}
      </Text>
      <Text weight="light" size="s">
        {job.company.name}
      </Text>

      {/* <ReactMarkdown>{job.description}</ReactMarkdown> */}

      <Stack>
        {job.tasks.map((task) => (
          <Link href={`/admin/tasks/${task.id}`} key={task.id}>
            <Card>
              <Text>{task.description}</Text>
              <div>
                {task.tasksToSkills.map(({ skill }) => (
                  <Pill>
                    <Text>{skill.name}</Text>
                  </Pill>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
