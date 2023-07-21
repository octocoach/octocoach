import { WC } from "@octocoach/charts";
import { asc, desc, sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { skills } from "@octocoach/db/src/schema/skills";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import Message from "@octocoach/i18n/src/react-message";
import { Container, Stack, Text } from "@octocoach/ui";

export default async function Page() {
  const s = await db
    .select({
      id: skills.id,
      name: skills.name,
      count: sql<number>`(select count(*) from ${tasksToSkills} where ${tasksToSkills.skillId} = ${skills.id})`,
    })
    .from(skills)
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
      </Stack>
    </Container>
  );
}
