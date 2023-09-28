import Logo from "@components/logo";
import { db } from "@octocoach/db/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const employers = await db.query.employerTable.findMany({
    with: {},
  });

  return (
    <Stack>
      <Text size="xl">
        <Message id="EMPLOYERS" />
      </Text>
      <Stack>
        {employers
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((employer) => (
            <Link href={`/admin/employers/${employer.id}`} key={employer.id}>
              <Stack direction="horizontal">
                <Logo employer={employer} size={50} />
                <Text>{employer.name}</Text>
              </Stack>
            </Link>
          ))}
      </Stack>
    </Stack>
  );
}
