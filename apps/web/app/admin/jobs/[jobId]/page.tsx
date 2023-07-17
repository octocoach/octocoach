import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { jobSchema, jobs } from "@octocoach/db/src/schema/jobs";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
      <div>
        <Text size="l">{job.title}</Text>
        <Text>{job.company.name}</Text>
      </div>
      <ReactMarkdown>{job.description}</ReactMarkdown>

      <Stack>
        {job.tasks.map((task) => (
          <Link href={`/admin/tasks/${task.id}`} key={task.id}>
            <Card>
              <Text>{task.description}</Text>
              {task.tasksToSkills.map(({ skill }) => (
                <Text size="s" element="span" key={skill.id}>
                  {skill.name},{" "}
                </Text>
              ))}
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
