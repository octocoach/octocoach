import { BarChart, PackCircles, SkillByCategory } from "@octocoach/charts";
import { BarChartItem } from "@octocoach/charts/bar";
import { db } from "@octocoach/db/src/connection";
import {
  SkillLevel,
  skillLevel,
} from "@octocoach/db/src/schema/users-skills-levels";
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

  const countSkills = (skillLevel: SkillLevel) =>
    user.usersSkillsLevels.filter((s) => s.skillLevel === skillLevel).length;

  const containerId = nanoid();

  const data = user.usersSkillsLevels.map((s) => ({
    fill: s.skillLevel,
    name: s.skill.name,
  }));

  const categoryLevels = user.usersSkillsLevels.map(
    ({ skill, skillLevel }) => ({
      category: skill.subcategory.category.name,
      skillLevel,
    })
  );

  return (
    <Stack id={containerId}>
      <Text size="l" variation="heading">
        Skill Self-Assessment
      </Text>
      <SkillByCategory data={categoryLevels} />
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

      {skillLevel.enumValues.map((level) => (
        <Card>
          <Stack>
            <Text size="l" variation="casual" weight="bold">
              {`${level} (${countSkills(level)})`}
            </Text>
            <Stack direction="horizontal" wrap>
              {user.usersSkillsLevels
                .filter(({ skillLevel }) => skillLevel === level)
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
