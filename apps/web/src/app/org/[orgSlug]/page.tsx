"use client";

import { useSession } from "@octocoach/auth/react";
import { Button, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();

  return (
    <Container element="main" display="flex" justifyItems="center">
      <Stack>
        <Link href={`/org/${params.orgSlug}/signup`}>
          <Button>Sign Up</Button>
        </Link>
      </Stack>
    </Container>
  );
}
