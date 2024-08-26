import { FillImage } from "@components/fill-image";
import type {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "@octocoach/ui/Box/Box";
import { Grid } from "@octocoach/ui/Grid/Grid";
import { Markdown } from "@octocoach/ui/Markdown/Markdown";
import { Stack } from "@octocoach/ui/Stack/Stack";
import { Tagline } from "@octocoach/ui/Tagline/Tagline";

export const heroSectionId: SectionId = "hero";

export type HeroSectionContent = SectionContentWithImage;

export interface HeroSectionProps {
  content: HeroSectionContent;
}

export const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <Box paddingX="small" paddingY="medium">
      <Grid placeItems="center" gap="extraLarge">
        <FillImage
          src={content.image.src}
          alt={content.image.alt}
          minHeight={300}
          objectFit="cover"
          roundedCorners
        />

        <Stack spacing="tight">
          <Tagline>{content.title}</Tagline>
          <Markdown>{content.text}</Markdown>
        </Stack>
      </Grid>
    </Box>
  );
};
