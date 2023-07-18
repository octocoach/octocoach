import { db } from "@octocoach/db/src/connection";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Container, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";

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
        <Text>
          <Message id="TASKS" />
        </Text>
        <Stack>
          {tasks.map((task) => (
            <Card key={task.id}>
              <Stack>
                <Stack spacing="tight">
                  <Link href={`/admin/jobs/${task.job.id}`}>
                    <Text size="s">{task.job.title}</Text>
                  </Link>
                  <Link href={`/admin/tasks/${task.id}`}>
                    <Text size="l">{task.description}</Text>
                  </Link>
                </Stack>
                <Stack direction="horizontal" spacing="tight">
                  {task.tasksToSkills.map(({ skill }) => (
                    <Link href={`/admin/skills/${skill.id}`} key={skill.id}>
                      <Tag>
                        <Text size="s" key={skill.id}>
                          {skill.name}
                        </Text>
                      </Tag>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
