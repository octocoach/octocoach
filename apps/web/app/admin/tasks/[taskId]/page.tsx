import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({ params }: { params: { taskId: number } }) {
  const task = await db.query.tasks.findFirst({
    where: (tasks, { eq }) => eq(tasks.id, params.taskId),
    with: {
      job: true,
      tasksToSkills: {
        with: {
          skill: true,
        },
      },
    },
  });

  return (
    <Container element="div">
      <Stack spacing="loose">
        <Link href="/admin/tasks">
          <Text>
            <Message id="TASKS" />
          </Text>
        </Link>
        <Link href={`/admin/jobs/${task.jobId}`}>
          <Text size="l" weight="light" variation="heading">
            {task.job.title}
          </Text>
        </Link>
        <Text size="xl" variation="heading">
          {task.description}
        </Text>

        <Stack>
          {task.tasksToSkills.map(({ skill }) => (
            <Link href={`/admin/skills/${skill.id}`} key={skill.id}>
              <Card>
                <Text size="l" weight="bold">
                  {skill.name}
                </Text>
                <Text>{skill.description}</Text>
              </Card>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
