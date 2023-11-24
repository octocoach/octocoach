import { Organization } from "@octocoach/db/schemas/common/organization";
import { Box, Stack, Text } from "@octocoach/ui";
import Link from "next/link";
import { headers } from "next/headers";

export default function Footer({
  organization,
}: {
  organization: Organization;
}) {
  const date = new Date();
  const baseUrl = headers().get("x-url");

  return (
    <Box backgroundColor="crust">
      <Stack justify="center" spacing="loose">
        <Stack direction="horizontal" align="center" justify="center" wrap>
          <Link href={`${baseUrl}/mission`}>Mission</Link>
          <Link href={`${baseUrl}/imprint`}>Impressum</Link>
          <Link href={`${baseUrl}/privacy`}>Privacy Policy</Link>
        </Stack>
        <Text size="s" weight="light" textAlign="center">
          {organization.legalName} © {date.getFullYear()}
        </Text>
      </Stack>
    </Box>
  );
}
