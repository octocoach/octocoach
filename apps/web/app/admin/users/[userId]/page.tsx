import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page({ params }: { params: { userId: string } }) {
  return (
    <Stack>
      <Link href={`/admin/users/${params.userId}/skills`}>
        <Text size="l" variation="heading">
          Skill Self-Assessment
        </Text>
      </Link>

      <Link href={`/admin/users/${params.userId}/tasks`}>
        <Text size="l" variation="heading">
          Task Affinity
        </Text>
      </Link>
    </Stack>
  );
}
