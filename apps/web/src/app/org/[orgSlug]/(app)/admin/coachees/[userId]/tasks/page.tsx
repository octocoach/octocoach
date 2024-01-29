import { BarChart } from "@octocoach/charts";
import { orgDb } from "@octocoach/db/connection";
import { Card, Stack, Text } from "@octocoach/ui";
import { nanoid } from "nanoid";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { orgSlug: string; userId: string };
}) {
  const db = orgDb(params.orgSlug);

  const user = await db.query.userTable.findFirst({
    with: {
      usersTaskInterest: {
        with: {
          task: true,
        },
      },
    },
    where: (users, { eq }) => eq(users.id, params.userId),
  });

  if (!user) notFound();

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
          value: user.usersTaskInterest.filter((i) => i.interest === value)
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
              {user.usersTaskInterest
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
