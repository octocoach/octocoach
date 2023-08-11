import { skillLevels } from "@app/constants";
import { BarChart, PackCircles } from "@octocoach/charts";
import { BarChartItem } from "@octocoach/charts/bar";
import { db } from "@octocoach/db/src/connection";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import { nanoid } from "nanoid";
import Link from "next/link";

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await db.query.users.findFirst({
    with: {
      usersSkillsLevels: {
        with: {
          skill: {
            with: {
              subcategory: {
                with: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
    where: (users, { eq }) => eq(users.id, params.userId),
  });

  const countSkills = (level: number) =>
    user.usersSkillsLevels.filter((s) => s.level === level).length;

  const containerId = nanoid();

  const data = user.usersSkillsLevels
    .sort((a, b) => b.level - a.level)
    .map((s) => ({
      fill: s.level,
      name: s.skill.name,
    }));

  return (
    <Stack id={containerId}>
      <Text size="l" variation="heading">
        Skill Self-Assessment
      </Text>
      <PackCircles container={containerId} data={data} />
      <BarChart
        container={containerId}
        height={300}
        data={Object.entries(
          user.usersSkillsLevels.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.skill.subcategory.name]:
                acc[curr.skill.subcategory.name] + 1 || 1,
            }),
            {} as BarChartItem
          )
        )
          .map(([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value)}
      />

      {skillLevels.map(({ title }, i) => (
        <Card>
          <Stack>
            <Text size="l" variation="casual" weight="bold">
              {`${title} (${countSkills(i)})`}
            </Text>
            <Stack direction="horizontal" wrap>
              {user.usersSkillsLevels
                .filter(({ level }) => level === i)
                .map(({ skill }) => (
                  <Link href={`/admin/skills/${skill.id}`}>
                    <Tag>{skill.name}</Tag>
                  </Link>
                ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
