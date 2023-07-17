import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { Card, Container, Stack, Text } from "@octocoach/ui";

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
