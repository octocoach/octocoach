import { Container, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Page({ params }: { params: { orgSlug } }) {
  return (
    <Container element="main">
      <Link href={`/${params.orgSlug}/start`}>
        <Text>Welcome</Text>
      </Link>
    </Container>
  );
}
