import {
  SectionContentSimple,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "../Box/Box";
import { Markdown } from "../Markdown/Markdown";
import { Text } from "../Text/Text";

export const aboutSectionId: SectionId = "about";

export type AboutSectionContent = SectionContentSimple;

export interface AboutSectionProps {
  content: AboutSectionContent;
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <Box paddingY="medium">
      <Text element="h2" size="l" weight="bold">
        {content.title}
      </Text>
      <Markdown>{content.text}</Markdown>
    </Box>
  );
};
