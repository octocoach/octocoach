import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default async function Page() {
  const companies = await db.query.companies.findMany({
    with: {},
  });

  return (
    <Stack>
      <Text size="xl">
        <Message id="COMPANIES" />
      </Text>
      <Stack>
        {companies
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((company) => (
            <div>
              <Link href={`/admin/companies/${company.id}`}>
                <Text>{company.name}</Text>
              </Link>
            </div>
          ))}
      </Stack>
    </Stack>
  );
}
