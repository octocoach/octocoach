import { db } from "@octocoach/db/src/connection";
import { Container, Stack, Text } from "@octocoach/ui";

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
            <Text size="l">
              {task.job.title}: {task.description}
            </Text>
            {task.tasksToSkills.map(({ skill }) => (
              <Text key={skill.id}>{skill.name}</Text>
            ))}
          </div>
        ))}
      </Stack>
    </Container>
  );
}
