"use client";

import { Button, Container, Stack, Text } from "@octocoach/ui";
import { signIn, signOut, useSession } from "next-auth/react";

export const runtime = "nodejs";

export default function Page() {
  const { data: session } = useSession();

  return (
    <Container element="header">
      <Stack direction="horizontal" align="right">
        {session?.user ? <Text>{session.user.name}</Text> : null}
        {session ? (
          <Button onPress={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onPress={() => signIn()}>Sign In</Button>
        )}
      </Stack>
    </Container>
  );
}
