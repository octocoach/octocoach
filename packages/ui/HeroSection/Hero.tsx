import type {
  SectionContentWithImage,
  SectionId,
} from "@octocoach/db/schemas/org/content";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";
import { Grid } from "../Grid/Grid";
import { Markdown } from "../Markdown/Markdown";
import { Stack } from "../Stack/Stack";
import { Tagline } from "../Tagline/Tagline";

export const heroSectionId: SectionId = "hero";

export type HeroSectionContent = SectionContentWithImage;

export interface HeroSectionProps {
  orgSlug: string;
  signedIn: boolean;
  content: HeroSectionContent;
}

export const HeroSection = ({
  content,
  orgSlug,
  signedIn,
}: HeroSectionProps) => {
  const getCTA = () =>
    !signedIn ? <Button>Sign Up</Button> : <Button>Start Debugging</Button>;

  return (
    <Box paddingX="small">
      <Grid placeItems="center" gap="medium">
        <img
          src={content.image.src}
          width={400}
          alt={content.image.alt}
          style={{ imageRendering: "pixelated" }}
        />

        <Stack spacing="loose">
          <Stack spacing="tight">
            <Tagline>{content.title}</Tagline>
            <Markdown>{content.text}</Markdown>
          </Stack>
          <Box textAlign="center" paddingX="none">
            {getCTA()}
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
};
