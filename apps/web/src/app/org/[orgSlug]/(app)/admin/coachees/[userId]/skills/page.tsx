import { BarChart, PackCircles, SkillByCategory } from "@octocoach/charts";
import { BarChartItem } from "@octocoach/charts/bar";
import { orgDb } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import { nanoid } from "nanoid";
import Link from "next/link";
import {
  skillLevelEnum,
  type SkillLevel,
} from "@octocoach/db/schemas/common/skill-level";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; userId: string };
}) {
  const db = orgDb(params.orgSlug);

  const user = await db.query.userTable.findFirst({
    with: {
      usersSkillLevels: {
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

  if (!user) notFound();

  const countSkills = (skillLevel: SkillLevel) =>
    user.usersSkillLevels.filter((s) => s.skillLevel === skillLevel).length;

  const containerId = nanoid();

  const data = user.usersSkillLevels.map((s) => ({
    fill: s.skillLevel,
    name: s.skill.name,
  }));

  const categoryLevels = user.usersSkillLevels.map(({ skill, skillLevel }) => ({
    category: skill.subcategory.category.name,
    skillLevel,
  }));

  return (
    <Stack id={containerId}>
      <Text size="l" variation="heading">
        Skill Self-Assessment
      </Text>
      <SkillByCategory data={categoryLevels} containerId={containerId} />
      <PackCircles container={containerId} data={data} />
      <BarChart
        containerId={containerId}
        height={300}
        data={Object.entries(
          user.usersSkillLevels.reduce((acc, curr) => {
            const currentLevel = acc[curr.skill.subcategory.name] || 0;

            return {
              ...acc,
              [curr.skill.subcategory.name]: currentLevel + 1,
            };
          }, {} as Record<string, number>)
        )
          .map(([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value)}
      />

      {skillLevelEnum.enumValues.map((level) => (
        <Card key={level}>
          <Stack>
            <Text size="l" variation="casual" weight="bold">
              <Message id={`skillLevels.${level}.title`} />
              {` (${countSkills(level)})`}
            </Text>
            <Stack direction="horizontal" wrap>
              {user.usersSkillLevels
                .filter(({ skillLevel }) => skillLevel === level)
                .map(({ skill }) => (
                  <Link href={`/admin/skills/${skill.id}`} key={skill.id}>
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
