import { WC } from "@octocoach/charts";
import { desc, eq, gte, sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { jobs } from "@octocoach/db/src/schema/jobs";
import { skills } from "@octocoach/db/src/schema/skills";
import { tasks } from "@octocoach/db/src/schema/tasks";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import Message from "@octocoach/i18n/src/react-message";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const s = await db
    .select({
      id: skills.id,
      name: skills.name,
      count: sql<number>`(select count(*) from ${tasksToSkills} where ${tasksToSkills.skillId} = ${skills.id})`,
    })
    .from(skills)
    .leftJoin(tasksToSkills, eq(skills.id, tasksToSkills.skillId))
    .leftJoin(tasks, eq(tasksToSkills.taskId, tasks.id))
    .leftJoin(jobs, eq(tasks.jobId, jobs.id))
    .where(gte(jobs.created, twoWeeksAgo))
    .groupBy(skills.id)
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
