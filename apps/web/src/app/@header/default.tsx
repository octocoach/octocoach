"use client";

import { Button, Container, Stack, Text } from "@octocoach/ui";
import { signIn, signOut, useSession } from "next-auth/react";

export const runtime = "nodejs";

export default function Page() {
  const { data: session } = useSession();

  return (
    <Container element="header" display="flex">
      <Stack direction="horizontal" justify="right">
        {session ? (
          <Button onPress={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onPress={() => signIn()}>Sign In</Button>
        )}
      </Stack>
    </Container>
  );
}
