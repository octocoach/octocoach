import { desc, eq, sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import {
  skillCategories,
  skillSubcategories,
  skills,
} from "@octocoach/db/src/schema/skills";
import { tasks } from "@octocoach/db/src/schema/tasks";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { categoryId: number };
}) {
  const category = await db.query.skillCategories.findFirst({
    where: (skillCategories, { eq }) =>
      eq(skillCategories.id, params.categoryId),
  });

  const t = await db
    .select({
      id: skillSubcategories.id,
      subCategory: skillSubcategories.name,
      count: sql<number>`count(${tasks.id})`,
    })
    .from(tasks)
    .leftJoin(tasksToSkills, eq(tasksToSkills.taskId, tasks.id))
    .leftJoin(skills, eq(skills.id, tasksToSkills.skillId))
    .leftJoin(
      skillSubcategories,
      eq(skillSubcategories.id, skills.subcategoryId)
    )
    .leftJoin(
      skillCategories,
      eq(skillCategories.id, skillSubcategories.categoryId)
    )
    .where(eq(skillCategories.id, params.categoryId))
    .groupBy(skillSubcategories.id, skillCategories.id)
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
