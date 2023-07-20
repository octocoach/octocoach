import { sql } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { skills } from "@octocoach/db/src/schema/skills";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import Message from "@octocoach/i18n/src/react-message";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const s = (
    await db
      .select({
        id: skills.id,
        name: skills.name,
        count: sql<number>`(select count(*) from ${tasksToSkills} where ${tasksToSkills.skillId} = ${skills.id})`,
      })
      .from(skills)
      .groupBy(skills.id)
      .having(({ count }) => sql`${count} > 0`)
  ).sort((a, b) =>
    a.count === b.count ? (a.name > b.name ? 1 : -1) : b.count - a.count
  );

  return (
    <Container element="section">
      <Stack>
        <Text size="l">
          <Message id="SKILLS" />
        </Text>
        <Stack spacing="tight">
          {s.map((k) => (
            <Link href={`/admin/skills/${k.id}`}>
              <Text size="m" key={k.id}>
                {k.name}: {`${k.count}`}
              </Text>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
