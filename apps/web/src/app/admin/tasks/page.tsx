import { db } from "@octocoach/db/connection";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Container, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const tasks = (
    await db.query.taskTable.findMany({
      with: {
        job: {
          with: {
            employer: true,
          },
        },
        skillsTasks: {
          with: {
            skill: true,
          },
        },
      },
    })
  ).sort((a, b) => (a.description > b.description ? 1 : -1));

  return (
    <Container element="section">
      <Stack>
        <Text weight="bold">
          <Message id="TASKS" />
        </Text>
        <Stack>
          {tasks.map((task) => (
            <Card key={task.id}>
              <Stack>
                <Stack spacing="tight">
                  <Text size="s">
                    <Link href={`/admin/jobs/${task.job.id}`}>
                      {task.job.title}
                    </Link>
                    {" @ "}
                    <Link href={`/admin/employers/${task.job.employerId}`}>
                      {task.job.employer.name}
                    </Link>
                  </Text>
                  <Link href={`/admin/tasks/${task.id}`}>
                    <Stack>
                      <Text size="l" variation="casual">
                        {task.description}
                      </Text>
                      <Text size="l">{task.question}</Text>
                    </Stack>
                  </Link>
                </Stack>
                <Stack direction="horizontal" spacing="tight" wrap>
                  {task.skillsTasks.map(({ skill }) => (
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
