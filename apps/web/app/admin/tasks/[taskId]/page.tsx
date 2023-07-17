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
      <Text size="l">{task.description}</Text>
      <Text>Skills</Text>
      <Stack>
        {task.tasksToSkills.map(({ skill }) => (
          <Link href={`/admin/skills/${skill.id}`} key={skill.id}>
            <Card>
              <Text>{skill.name}</Text>
              <Text>{skill.description}</Text>
            </Card>
          </Link>
        ))}
      </Stack>
      <Text>Job</Text>
      <Link href={`/admin/jobs/${task.jobId}`}>
        <Text>{task.job.title}</Text>
      </Link>
    </Container>
  );
}
