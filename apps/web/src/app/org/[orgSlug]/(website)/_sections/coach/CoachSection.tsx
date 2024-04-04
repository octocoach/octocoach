import {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "@octocoach/ui/Box/Box";
import { Markdown } from "@octocoach/ui/Markdown/Markdown";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";

export const coachSectionId: SectionId = "coach";

export type CoachSectionContent = SectionContentWithImage;

export interface CoachSectionProps {
  content: CoachSectionContent;
}

export const CoachSection = ({ content }: CoachSectionProps) => {
  return (
    <Box paddingY="medium">
      <Stack align="center">
        <img
          src={content.image.src}
          style={{
            imageRendering: "pixelated",
            width: "clamp(280px, 50%, 400px)",
            minWidth: 280,
          }}
          alt={content.image.alt}
        />
        <Box paddingX="none">
          <Text element="h2" size="l" weight="bold">
            {content.title}
          </Text>
          <Markdown>{content.text}</Markdown>
        </Box>
      </Stack>
    </Box>
  );
};
