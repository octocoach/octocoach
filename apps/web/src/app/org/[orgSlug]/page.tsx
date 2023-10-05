"use client";

import { Button, Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { useTransition } from "react";
import { deleteOrgAction } from "./actions";

export default function Page({ params }: { params: { orgSlug } }) {
  const [isPending, startTransition] = useTransition();

  async function onDelete() {
    await startTransition(async () => {
      deleteOrgAction(params.orgSlug);
    });
  }

  return (
    <Container element="main">
      <Stack>
        <Link href={`/${params.orgSlug}/start`}>
          <Text>Welcome</Text>
        </Link>
      </Stack>

      <Button onPress={onDelete} disabled={isPending}>
        Delete
      </Button>
    </Container>
  );
}
