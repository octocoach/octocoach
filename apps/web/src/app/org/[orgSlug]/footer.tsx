import { Organization } from "@octocoach/db/schemas/common/organization";
import { Box, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Footer({
  organization,
}: {
  organization: Organization;
}) {
  const date = new Date();

  return (
    <Box backgroundColor="crust">
      <Stack justify="center" spacing="loose">
        <Stack direction="horizontal" align="center" justify="center" wrap>
          <Link href={`/org/${organization.slug}/mission`}>Mission</Link>
          <Link href={`/org/${organization.slug}/imprint`}>Impressum</Link>
          <Link href={`/org/${organization.slug}/privacy`}>Privacy Policy</Link>
          <Link href={`/org/${organization.slug}/terms`}>Terms of use</Link>
        </Stack>
        <Text size="s" weight="light" textAlign="center">
          {organization.legalName} © {date.getFullYear()}
        </Text>
      </Stack>
    </Box>
  );
}
