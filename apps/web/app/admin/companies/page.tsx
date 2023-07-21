import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text } from "@octocoach/ui";
import Image from "next/image";
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
            <Link href={`/admin/companies/${company.id}`} key={company.id}>
              <Stack direction="horizontal">
                <Image
                  alt="Logo"
                  width={50}
                  height={50}
                  src={
                    company.url
                      ? `https://logo.clearbit.com/${company.url}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          company.name
                        )}`
                  }
                />
                <Text>{company.name}</Text>
              </Stack>
            </Link>
          ))}
      </Stack>
    </Stack>
  );
}
