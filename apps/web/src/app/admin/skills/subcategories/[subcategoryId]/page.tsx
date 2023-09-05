import { desc, eq, sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import {
  skillSubcategories,
  skills as skillsTable,
} from "@octocoach/db/src/schema/skills";
import { tasks as tasksTable } from "@octocoach/db/src/schema/tasks";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { subcategoryId: number };
}) {
  const { name, category } = await db.query.skillSubcategories.findFirst({
    with: {
      category: true,
    },
    where: (skillSubCategories, { eq }) =>
      eq(skillSubCategories.id, params.subcategoryId),
  });

  const tasks = await db
    .select({
      name: skillsTable.name,
      id: skillsTable.id,
      taskCount: sql<number>`count(${tasksTable.id})`,
    })
    .from(skillsTable)
    .leftJoin(
      skillSubcategories,
      eq(skillsTable.subcategoryId, skillSubcategories.id)
    )
    .leftJoin(tasksToSkills, eq(tasksToSkills.skillId, skillsTable.id))
    .leftJoin(tasksTable, eq(tasksTable.id, tasksToSkills.taskId))
    .where(eq(skillSubcategories.id, params.subcategoryId))
    .groupBy(skillsTable.name, skillsTable.id)
    .orderBy(({ taskCount }) => desc(taskCount))
    .having(({ taskCount }) => sql<number>`${taskCount} > 0`);

  return (
    <Container element="section">
      <Stack>
        <Link href={`/admin/skills/categories/${category.id}`}>
          <Text size="s">{category.name}</Text>
        </Link>
        <Text size="xl">{name}</Text>
        <Stack>
          {tasks.map(({ name, taskCount, id }) => (
            <Card key={id}>
              <Link href={`/admin/skills/${id}`}>
                <Text>
                  {name} ({taskCount})
                </Text>
              </Link>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
