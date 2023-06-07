import { Container, Stack, Typography } from "@octocoach/ui";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container element="section">
      <Stack align="left">
        <Typography element="h1" size="xl">
          <Link href="/admin">Admin</Link>
        </Typography>
        <section>{children}</section>
      </Stack>
    </Container>
  );
}
