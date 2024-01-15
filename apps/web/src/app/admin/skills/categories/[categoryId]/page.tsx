import { db } from "@octocoach/db/connection";
import { desc, eq, sql } from "@octocoach/db/operators";
import {
  skillCategoryTable,
  skillSubcategoryTable,
  skillTable,
  skillsTasksTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { categoryId: number };
}) {
  const category = await db.query.skillCategoryTable.findFirst({
    where: (skillCategories, { eq }) =>
      eq(skillCategories.id, params.categoryId),
  });

  if (!category) return notFound();

  const t = await db
    .select({
      id: skillSubcategoryTable.id,
      subCategory: skillSubcategoryTable.name,
      count: sql<number>`count(${taskTable.id})`,
    })
    .from(taskTable)
    .leftJoin(skillsTasksTable, eq(skillsTasksTable.taskId, taskTable.id))
    .leftJoin(skillTable, eq(skillTable.id, skillsTasksTable.skillId))
    .leftJoin(
      skillSubcategoryTable,
      eq(skillSubcategoryTable.id, skillTable.subcategoryId)
    )
    .leftJoin(
      skillCategoryTable,
      eq(skillCategoryTable.id, skillSubcategoryTable.categoryId)
    )
    .where(eq(skillCategoryTable.id, params.categoryId))
    .groupBy(skillSubcategoryTable.id, skillCategoryTable.id)
    .orderBy(({ count }) => desc(count));

  return (
    <div>
      <Link href="/admin/skills/categories">
        <Text>Categories</Text>
      </Link>
      <Stack spacing="loose">
        <Text size="xl">{category.name}</Text>
        <Stack>
          {t.map(({ count, id, subCategory }) => (
            <Link href={`/admin/skills/subcategories/${id}`} key={id}>
              <Text>
                {subCategory} ({count})
              </Text>
            </Link>
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
