import { EditSection } from "@components/EditSection";
import { SectionWithLocale } from "@octocoach/db/schemas/org/content";
import {
  Container,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
} from "@octocoach/ui";
import { filterContentById } from "@octocoach/ui/helpers";

export const EditContent = ({
  content,
  slug,
}: {
  content: SectionWithLocale[];
  slug: string;
}) => {
  const heroSection = filterContentById(content, heroSectionId);
  const aboutSection = filterContentById(content, aboutSectionId);
  const coachSection = filterContentById(content, coachSectionId);

  return (
    <Container>
      <Text size="xl">Website Content</Text>

      <Stack>
        <EditSection
          section={heroSection}
          name="Hero Section"
          slug={slug}
          id={heroSectionId}
        />
        <EditSection
          section={aboutSection}
          name="About Section"
          slug={slug}
          id={aboutSectionId}
        />
        <EditSection
          section={coachSection}
          name="Coach Section"
          slug={slug}
          id={coachSectionId}
        />
      </Stack>
    </Container>
  );
};
