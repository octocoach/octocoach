import Link from "next/link";
import { db } from "@octocoach/db/src/connection";
import { Card, Container, Stack, Typography } from "@octocoach/ui";

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
      <Typography size="l">{task.description}</Typography>
      <Typography>Skills</Typography>
      <Stack>
        {task.tasksToSkills.map(({ skill }) => (
          <Link href={`/admin/skills/${skill.id}`} key={skill.id}>
            <Card>
              <Typography>{skill.name}</Typography>
              <Typography>{skill.description}</Typography>
            </Card>
          </Link>
        ))}
      </Stack>
      <Typography>Job</Typography>
      <Link href={`/admin/jobs/${task.jobId}`}>
        <Typography>{task.job.title}</Typography>
      </Link>
    </Container>
  );
}
