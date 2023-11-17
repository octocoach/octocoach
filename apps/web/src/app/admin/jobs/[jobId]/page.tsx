import { db } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function Page({ params }: { params: { jobId: number } }) {
  const job = await db.query.jobTable.findFirst({
    where: (jobs, { eq }) => eq(jobs.id, params.jobId),
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
    <Stack>
      <Link href="/admin/jobs">
        <Text>
          <Message id="JOBS" />
        </Text>
      </Link>
      <Text size="l" weight="extraBold" variation="heading">
        {job.title}
      </Text>
      <Link href={`/admin/employers/${job.employer.id}`}>
        <Text weight="light" size="s">
          {job.employer.name}
        </Text>
      </Link>

      <ReactMarkdown>{job.description}</ReactMarkdown>

      <Stack>
        {job.tasks.map((task) => (
          <Link href={`/admin/tasks/${task.id}`} key={task.id}>
            <Card>
              <Stack>
                <Text>{task.description}</Text>
                <Stack direction="horizontal" wrap spacing="tight">
                  {task.skillsTasks.map(({ skill }) => (
                    <Tag key={skill.id}>
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
