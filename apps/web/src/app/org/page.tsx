import { Container, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page() {
  return (
    <Container element="section">
      <Stack>
        <Text size="xl">Organizations</Text>
        <Link href="/org/new">
          <Text>New</Text>
        </Link>
      </Stack>
    </Container>
  );
}
