import { db } from "@octocoach/db/src/connection";
import Message from "@octocoach/i18n/src/react-message";
import { Stack, Text } from "@octocoach/ui";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { companyId: number };
}) {
  const company = await db.query.companies.findFirst({
    where: (companies, { eq }) => eq(companies.id, params.companyId),
    with: {
      jobs: true,
    },
  });

  return (
    <Stack>
      <Link href="/admin/companies">
        <Text size="m">
          <Message id="COMPANIES" />
        </Text>
      </Link>
      <Image
        src={`https://logo.clearbit.com/${company.url}`}
        alt="logo"
        width={50}
        height={50}
      />

      <Text size="xl">{company.name}</Text>
      <Text>{company.url}</Text>
      <Stack>
        {company.jobs.map((job) => (
          <Link href={`/admin/jobs/${job.id}`} key={job.id}>
            <Text>{job.title}</Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
