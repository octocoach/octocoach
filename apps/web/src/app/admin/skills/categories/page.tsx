import { db } from "@octocoach/db/connection";
import { desc, eq, sql } from "@octocoach/db/operators";
import {
  skillCategoryTable,
  skillsTasksTable,
  skillSubcategoryTable,
  skillTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const categories = await db
    .select({
      id: skillCategoryTable.id,
      category: skillCategoryTable.name,
      taskCount: sql<number>`count(${taskTable.id})`,
    })
    .from(skillCategoryTable)
    .leftJoin(
      skillSubcategoryTable,
      eq(skillSubcategoryTable.categoryId, skillCategoryTable.id)
    )
    .leftJoin(
      skillTable,
      eq(skillTable.subcategoryId, skillSubcategoryTable.id)
    )
    .leftJoin(skillsTasksTable, eq(skillsTasksTable.skillId, skillTable.id))
    .leftJoin(taskTable, eq(taskTable.id, skillsTasksTable.taskId))
    .groupBy(skillCategoryTable.id)
    .orderBy(({ taskCount }) => desc(taskCount));

  return (
    <Container element="section">
      <Link href="/admin/skills">
        <Text>Skills</Text>
      </Link>
      <Stack spacing="loose">
        <Text size="xl">Categories</Text>
        <Stack>
          {categories.map(({ category, taskCount, id }) => (
            <Link href={`/admin/skills/categories/${id}`} key={id}>
              <Text>
                {category} ({taskCount})
              </Text>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
