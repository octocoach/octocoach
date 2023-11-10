import { EditSection } from "@components/EditSection";
import { ContentLocale } from "@octocoach/db/schemas/org/content";
import {
  Container,
  EditSectionContentSimple,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
} from "@octocoach/ui";
import { filterContentById } from "@octocoach/ui/helpers";
import { saveContent } from "src/actions/content";

export const EditContent = ({
  content,
  slug,
}: {
  content: ContentLocale[];
  slug: string;
}) => {
  const heroSection = filterContentById(content, heroSectionId);
  const aboutSection = filterContentById(content, aboutSectionId);
  const coachSection = filterContentById(content, coachSectionId);

  const saveContentWithSlug = saveContent.bind("data", slug);

  return (
    <Container>
      <Text size="xl">Website Content</Text>

      <Stack>
        <EditSectionContentSimple
          content={content}
          name="About"
          id={aboutSectionId}
          saveContent={saveContentWithSlug}
        />
        {/* <EditSection
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
        /> */}
      </Stack>
    </Container>
  );
};
