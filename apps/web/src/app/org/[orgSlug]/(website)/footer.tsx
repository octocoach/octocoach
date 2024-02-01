import LanguageSwitcher from "@components/language-switcher";
import { getLocale } from "@helpers/locale";
import { Organization } from "@octocoach/db/schemas/common/organization";
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
  const locale = getLocale();

  return (
    <Box backgroundColor="crust" paddingY="medium" paddingX="small">
      <Stack justify="center" spacing="loose">
        <Stack direction="horizontal" align="center" justify="center" wrap>
          <Link href={`${baseUrl}mission`}>Mission</Link>
          <Link href={`${baseUrl}imprint`}>Impressum</Link>
          <Link href={`${baseUrl}privacy`}>Privacy Policy</Link>
          <LanguageSwitcher locale={locale} baseUrl={baseUrl} />
        </Stack>
        <Text size="s" weight="light" textAlign="center">
          {organization.legalName} © {date.getFullYear()}
        </Text>
      </Stack>
    </Box>
  );
}
