import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";

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
        <Text>
          <Message id="JOBS" />
        </Text>
      </Link>
      <Text size="l" weight="extraBold" variation="heading">
        {job.title}
      </Text>
      <Link href={`/admin/companies/${job.company.id}`}>
        <Text weight="light" size="s">
          {job.company.name}
        </Text>
      </Link>

      {/* <ReactMarkdown>{job.description}</ReactMarkdown> */}

      <Stack>
        {job.tasks.map((task) => (
          <Link href={`/admin/tasks/${task.id}`} key={task.id}>
            <Card>
              <Stack>
                <Text>{task.description}</Text>
                <Stack direction="horizontal" spacing="tight">
                  {task.tasksToSkills.map(({ skill }) => (
                    <Tag>
                      <Text size="s">{skill.name}</Text>
                    </Tag>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
