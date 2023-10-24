"use client";

import { signIn, signOut, useSession } from "@octocoach/auth/react";
import { Button, Container, Stack } from "@octocoach/ui";

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
