"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page() {
  const { organizationList, isLoaded } = useOrganizationList();

  if (!isLoaded) return null;

  return (
    <Stack>
      {organizationList.map(({ organization }) => (
        <Text key={organization.id}>
          <Link href={`/admin/organizations/${organization.slug}`}>
            {organization.name}
          </Link>
        </Text>
      ))}
    </Stack>
  );
}
