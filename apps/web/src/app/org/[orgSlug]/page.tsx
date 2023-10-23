"use client";

import { useSession } from "@octocoach/auth/react";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();

  if (!session) return <Text>Signed out</Text>;

  return (
    <Container element="main">
      <Stack>
        <Link href={`/org/${params.orgSlug}/start`}>
          <Button>Start</Button>
        </Link>
      </Stack>
    </Container>
  );
}
