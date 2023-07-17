"use client";

import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Container, Stack, Typography } from "@octocoach/ui";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { LL } = useI18nContext();
  return (
    <Container element="section">
      <Stack>
        <Typography element="h1" size="l">
          <Link href="/admin">{LL.ADMIN()}</Link>
        </Typography>
        <section>{children}</section>
      </Stack>
    </Container>
  );
}
