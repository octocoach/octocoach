import { db } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

const Pill = ({ children }: { children: string }) => (
  <Tag>
    <Text size="s" weight="light">
      {children}
    </Text>
  </Tag>
);

export default async function Page({
  params,
}: {
  params: { skillId: string };
}) {
  const skill = await db.query.skillTable.findFirst({
    where: (skills, { eq }) => eq(skills.id, params.skillId),
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      skillsTasks: {
        with: {
          task: true,
        },
      },
    },
  });

  if (!skill) notFound();

  return (
    <Stack>
      <Link href="/admin/skills">
        <Text>
          <Message id="SKILLS" />
        </Text>
      </Link>
      <Text size="s">
        <Link href={`/admin/skills/categories/${skill.subcategory.categoryId}`}>
          {skill.subcategory.category.name}
        </Link>{" "}
        -{" "}
        <Link href={`/admin/skills/subcategories/${skill.subcategoryId}`}>
          {skill.subcategory.name}
        </Link>
      </Text>
      <Text size="xl" variation="heading">
        {skill.name}
      </Text>
      <Text>{skill.description}</Text>
      <Stack direction="horizontal">
        {skill.isSoftware && <Pill>Software</Pill>}
        {skill.isLanguage && <Pill>Language</Pill>}
      </Stack>

      <Text size="l">Tasks</Text>
      <Stack>
        {skill.skillsTasks.map(({ task }) => (
          <Link href={`/admin/tasks/${task.id}`} key={task.id}>
            <Card>
              <Text>{task.description}</Text>
            </Card>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
