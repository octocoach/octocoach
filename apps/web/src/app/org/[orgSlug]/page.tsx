"use client";

import { useSession } from "@octocoach/auth/react";
import { Button, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page({ params }: { params: { orgSlug } }) {
  const { data: session } = useSession();

  return (
    <Stack align="center" spacing="loose">
      <Text>Welcome</Text>

      {!session?.user ? (
        <Link href={`/org/${params.orgSlug}/signup`}>
          <Button>Sign Up</Button>
        </Link>
      ) : (
        <Link href={`/org/${params.orgSlug}/start`}>
          <Button>Start</Button>
        </Link>
      )}
    </Stack>
  );
}
