import { BarChart } from "@octocoach/charts";
import { db } from "@octocoach/db/src/connection";
import { Card, Stack, Text } from "@octocoach/ui";
import { nanoid } from "nanoid";
import Link from "next/link";

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await db.query.users.findFirst({
    with: {
      usersTasksInterest: {
        with: {
          task: true,
        },
      },
    },
    where: (users, { eq }) => eq(users.id, params.userId),
  });

  const likeLevel = {
    no: -1,
    dontknow: 0,
    yes: 1,
  };

  const containerId = nanoid();

  return (
    <Stack id={containerId}>
      <Text size="l" variation="heading">
        Task Affinity
      </Text>
      <BarChart
        containerId={containerId}
        height={500}
        data={Object.entries(likeLevel).map(([label, value]) => ({
          label,
          value: user.usersTasksInterest.filter((i) => i.interest === value)
            .length,
        }))}
      />
      {[-1, 0, 1].map((interest) => (
        <Card key={interest}>
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
                  <Link href={`/admin/tasks/${task.id}`} key={task.id}>
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
