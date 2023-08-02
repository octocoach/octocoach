import { sql, eq, desc } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import {
  skillCategories,
  skillSubcategories,
  skills,
} from "@octocoach/db/src/schema/skills";
import { tasks } from "@octocoach/db/src/schema/tasks";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const categories = await db
    .select({
      id: skillCategories.id,
      category: skillCategories.name,
      taskCount: sql<number>`count(${tasks.id})`,
    })
    .from(skillCategories)
    .leftJoin(
      skillSubcategories,
      eq(skillSubcategories.categoryId, skillCategories.id)
    )
    .leftJoin(skills, eq(skills.subcategoryId, skillSubcategories.id))
    .leftJoin(tasksToSkills, eq(tasksToSkills.skillId, skills.id))
    .leftJoin(tasks, eq(tasks.id, tasksToSkills.taskId))
    .groupBy(skillCategories.id)
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
            <Link href={`/admin/skills/categories/${id}`}>
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
