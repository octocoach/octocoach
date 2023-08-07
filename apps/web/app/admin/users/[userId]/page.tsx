import { skillLevels } from "@app/constants";
import { BarChart } from "@octocoach/charts";
import { db } from "@octocoach/db/src/connection";
import { Card, Stack, Tag, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await db.query.users.findFirst({
    with: {
      usersSkillsLevels: {
        with: {
          skill: true,
        },
      },
      usersTasksInterest: {
        with: {
          task: true,
        },
      },
    },
    where: (users, { eq }) => eq(users.id, params.userId),
  });

  const countSkills = (level: number) =>
    user.usersSkillsLevels.filter((s) => s.level === level).length;

  const likeLevel = {
    no: -1,
    dontknow: 0,
    yes: 1,
  };

  return (
    <Stack>
      <Text size="l" variation="heading">
        Skill Self-Assessment
      </Text>
      <BarChart
        width={900}
        height={500}
        data={skillLevels.map(({ title }, i) => ({
          value: countSkills(i),
          label: title,
        }))}
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
      <Text size="l" variation="heading">
        Task Affinity
      </Text>
      <BarChart
        width={900}
        height={500}
        data={Object.entries(likeLevel).map(([label, value]) => ({
          label,
          value: user.usersTasksInterest.filter((i) => i.interest === value)
            .length,
        }))}
      />
      {[-1, 0, 1].map((interest) => (
        <Card>
          <Stack spacing="loose">
            <Text size="l" variation="casual" weight="bold">
              {interest < 0
                ? "Not interested"
                : interest === 0
                ? "Maybe"
                : "Interested"}
            </Text>

            <Stack>
              {user.usersTasksInterest
                .filter((x) => x.interest === interest)
                .map(({ task }) => (
                  <Link href={`/admin/tasks/${task.id}`}>
                    <Text>{task.description}</Text>
                  </Link>
                ))}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
