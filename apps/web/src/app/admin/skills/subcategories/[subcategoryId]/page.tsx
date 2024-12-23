import { db } from "@octocoach/db/connection";
import { desc, eq, sql } from "@octocoach/db/operators";
import {
  skillsTasksTable,
  skillSubcategoryTable,
  skillTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Card, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subcategoryId: number };
}) {
  const subCategory = await db.query.skillSubcategoryTable.findFirst({
    with: {
      category: true,
    },
    where: (skillSubCategories, { eq }) =>
      eq(skillSubCategories.id, params.subcategoryId),
  });

  if (!subCategory) notFound();

  const tasks = await db
    .select({
      name: skillTable.name,
      id: skillTable.id,
      taskCount: sql<number>`count(${taskTable.id})`,
    })
    .from(skillTable)
    .leftJoin(
      skillSubcategoryTable,
      eq(skillTable.subcategoryId, skillSubcategoryTable.id)
    )
    .leftJoin(skillsTasksTable, eq(skillsTasksTable.skillId, skillTable.id))
    .leftJoin(taskTable, eq(taskTable.id, skillsTasksTable.taskId))
    .where(eq(skillSubcategoryTable.id, params.subcategoryId))
    .groupBy(skillTable.name, skillTable.id)
    .orderBy(({ taskCount }) => desc(taskCount))
    .having(({ taskCount }) => sql<number>`${taskCount} > 0`);

  return (
    <Container element="section">
      <Stack>
        <Link href={`/admin/skills/categories/${subCategory.category.id}`}>
          <Text size="s">{subCategory.category.name}</Text>
        </Link>
        <Text size="xl">{subCategory.name}</Text>
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
