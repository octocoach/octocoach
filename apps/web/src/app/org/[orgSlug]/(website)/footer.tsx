import { Organization } from "@octocoach/db/schemas/common/organization";
import Message from "@octocoach/i18n/src/react-message";
import { Box, Stack, Text } from "@octocoach/ui";
import Link from "next/link";

export default function Footer({
  organization,
  baseUrl,
}: {
  organization: Organization;
  baseUrl: string;
}) {
  const date = new Date();

  return (
    <Box backgroundColor="crust" paddingY="medium" paddingX="small">
      <Stack justify="center" spacing="loose">
        <Stack direction="horizontal" align="center" justify="center" wrap>
          <Link href={`${baseUrl}mission`}>
            <Message id="mission" />
          </Link>
          <Link href={`${baseUrl}imprint`}>
            <Message id="imprint" />
          </Link>
          <Link href={`${baseUrl}terms`}>
            <Message id="termsOfUse" />
          </Link>
          <Link href={`${baseUrl}privacy`}>
            <Message id="privacyPolicy" />
          </Link>
        </Stack>
        <Text size="s" weight="light" textAlign="center">
          {organization.legalName} © {date.getFullYear()}
        </Text>
      </Stack>
    </Box>
  );
}
