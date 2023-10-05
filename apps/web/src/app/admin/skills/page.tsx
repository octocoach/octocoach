import { WC } from "@octocoach/charts";
import { db } from "@octocoach/db/connection";
import { desc, eq, gte, sql } from "@octocoach/db/operators";
import { jobTable } from "@octocoach/db/schemas/common/job";
import { skillTable } from "@octocoach/db/schemas/common/skill";
import { skillsTasksTable } from "@octocoach/db/schemas/common/skills-tasks";
import { taskTable } from "@octocoach/db/schemas/common/task";
import Message from "@octocoach/i18n/src/react-message";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const s = await db
    .select({
      id: skillTable.id,
      name: skillTable.name,
      count: sql<number>`(select count(*) from ${skillsTasksTable} where ${skillsTasksTable.skillId} = ${skillTable.id})`,
    })
    .from(skillTable)
    .leftJoin(skillsTasksTable, eq(skillTable.id, skillsTasksTable.skillId))
    .leftJoin(taskTable, eq(skillsTasksTable.taskId, taskTable.id))
    .leftJoin(jobTable, eq(taskTable.jobId, jobTable.id))
    .where(gte(jobTable.created, twoWeeksAgo))
    .groupBy(skillTable.id)
    .having(({ count }) => sql`${count} > 0`)
    .orderBy(({ count }) => desc(count));

  const words = s.map((skill) => ({
    text: skill.name.replace(/\s*\([^)]*\)/g, ""),
    value: skill.count,
  }));

  return (
    <Container element="section" id="cloudcontainer">
      <Stack>
        <Text size="l">
          <Message id="SKILLS" />
        </Text>
        <WC words={words} container="cloudcontainer" />
        <Link href="/admin/skills/categories">
          <Text>Categories</Text>
        </Link>
      </Stack>
    </Container>
  );
}
