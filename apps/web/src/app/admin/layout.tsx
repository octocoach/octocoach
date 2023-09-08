"use client";

import Protected from "@components/protected";
import { useI18nContext } from "@octocoach/i18n/src/i18n-react";
import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { LL } = useI18nContext();
  return (
    <Protected>
      <Container element="section">
        <Stack>
          <Text element="h1" size="l">
            <Link href="/admin">{LL.ADMIN()}</Link>
          </Text>
          <section>{children}</section>
        </Stack>
      </Container>
    </Protected>
  );
}
