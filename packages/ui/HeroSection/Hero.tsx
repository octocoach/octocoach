import type {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "../Box/Box";
import { Grid } from "../Grid/Grid";
import { Markdown } from "../Markdown/Markdown";
import { Stack } from "../Stack/Stack";
import { Tagline } from "../Tagline/Tagline";

export const heroSectionId: SectionId = "hero";

export type HeroSectionContent = SectionContentWithImage;

export interface HeroSectionProps {
  content: HeroSectionContent;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <Box paddingX="small" paddingY="medium">
      <Grid placeItems="center" gap="medium">
        <img
          src={content.image.src}
          width={400}
          alt={content.image.alt}
          style={{ imageRendering: "pixelated" }}
        />

        <Stack spacing="tight">
          <Tagline>{content.title}</Tagline>
          <Markdown>{content.text}</Markdown>
        </Stack>
      </Grid>
    </Box>
  );
};
