"use client";

import { Button, Container, Stack } from "@octocoach/ui";
import Link from "next/link";

export default function Page({ params }: { params: { orgSlug } }) {
  return (
    <Container element="main">
      <Stack>
        <Link href={`/org/${params.orgSlug}/start`}>
          <Button>Start</Button>
        </Link>
        <Link href={`/org/${params.orgSlug}/admin`}>
          <Button>Admin</Button>
        </Link>
      </Stack>
    </Container>
  );
}
