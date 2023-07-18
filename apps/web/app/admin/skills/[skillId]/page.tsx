import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { skillId: string };
}) {
  const skill = await db.query.skills.findFirst({
    where: (skills, { eq }) => eq(skills.id, params.skillId),
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      tasksToSkills: {
        with: {
          task: true,
        },
      },
    },
  });

  return (
    <Stack>
      <Link href="/admin/skills">
        <Message id="SKILLS" />
      </Link>
      <Text>
        {skill.subcategory.category.name} - {skill.subcategory.name}
      </Text>
      <Text size="l">{skill.name}</Text>
      <Text>{skill.description}</Text>
      <Text>Software: {skill.isSoftware ? "yes" : "no"}</Text>
      <Text>Language: {skill.isLanguage ? "yes" : "no"}</Text>
      <Link href={skill.infoUrl}>Source</Link>
      <Container element="div">
        <Text size="l">Tasks</Text>
        <Stack>
          {skill.tasksToSkills.map(({ task }) => (
            <Link href={`/admin/tasks/${task.id}`} key={task.id}>
              <Text>{task.description}</Text>
            </Link>
          ))}
        </Stack>
      </Container>
    </Stack>
  );
}
