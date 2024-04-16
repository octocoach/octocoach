import {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "@octocoach/ui/Box/Box";
import { Markdown } from "@octocoach/ui/Markdown/Markdown";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Text } from "@octocoach/ui/Text/Text";
import Image from "next/image";

export const coachSectionId: SectionId = "coach";

export type CoachSectionContent = SectionContentWithImage;

export interface CoachSectionProps {
  content: CoachSectionContent;
}

export const CoachSection = ({ content }: CoachSectionProps) => {
  return (
    <Box paddingY="medium">
      <Stack align="center">
        <div
          style={{
            position: "relative",
            width: "min(100%, 400px)",
            height: "clamp(200px, calc(100vw * 0.3), 400px)",
          }}
        >
          <Image
            src={content.image.src}
            style={{
              imageRendering: "pixelated",
              objectFit: "contain",
            }}
            fill={true}
            alt={content.image.alt}
          />
        </div>
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
