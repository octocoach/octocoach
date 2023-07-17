import { db } from "@octocoach/db/src/connection";
import { Container, Stack, Typography } from "@octocoach/ui";

export default async function Page() {
  const tasks = await db.query.tasks.findMany({
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
    <Container element="section">
      <Stack>
        {tasks.map((task) => (
          <div key={task.id}>
            <Typography size="l">
              {task.job.title}: {task.description}
            </Typography>
            {task.tasksToSkills.map(({ skill }) => (
              <Typography key={skill.id}>{skill.name}</Typography>
            ))}
          </div>
        ))}
      </Stack>
    </Container>
  );
}
