import { CertquaOrgSeal } from "@components/certqua-seal/organization";
import {
  SectionContentSimple,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Center, Stack } from "@octocoach/ui";
import { Box } from "@octocoach/ui/Box/Box";
import { Markdown } from "@octocoach/ui/Markdown/Markdown";
import { Text } from "@octocoach/ui/Text/Text";

export const aboutSectionId: SectionId = "about";

export type AboutSectionContent = SectionContentSimple;

export interface AboutSectionProps {
  content: AboutSectionContent;
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <Box paddingY="medium">
      <Stack>
        <Text element="h2" size="l" weight="bold">
          {content.title}
        </Text>
        <Markdown>{content.text}</Markdown>
        <Center>
          <CertquaOrgSeal />
        </Center>
      </Stack>
    </Box>
  );
};
