"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page() {
  const { LL } = useI18nContext();
  return (
    <Stack>
      <Link href="/admin/jobs">
        <Text>{LL.JOBS()}</Text>
      </Link>
      <Link href="/admin/tasks">
        <Text>{LL.TASKS()}</Text>
      </Link>
      <Link href="/admin/employers">
        <Text>{LL.EMPLOYERS()}</Text>
      </Link>
      <Link href="/admin/skills">
        <Text>{LL.SKILLS()}</Text>
      </Link>
      <Link href="/admin/organizations">
        <Text>Organizations</Text>
      </Link>
    </Stack>
  );
}
