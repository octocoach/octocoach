import { ContentLocale } from "@octocoach/db/schemas/org/content";
import {
  Container,
  EditFaqSection,
  EditSectionContentSimple,
  EditSectionContentWithImage,
  EditSectionContentWithSubSections,
  Stack,
  Text,
} from "@octocoach/ui";
import {
  aboutSectionId,
  coachSectionId,
  faqSectionId,
  heroSectionId,
  testimonialsSectionId,
} from "@sections/index";
import { saveContent } from "src/actions/content";

export const EditContent = ({
  content,
  slug,
}: {
  content: ContentLocale[];
  slug: string;
}) => {
  const saveContentWithSlug = saveContent.bind("data", slug);

  return (
    <Container>
      <Text size="xl">Website Content</Text>

      <Stack>
        <EditSectionContentWithImage
          content={content}
          name="Hero"
          id={heroSectionId}
          saveContent={saveContentWithSlug}
        />
        <EditSectionContentWithSubSections
          content={content}
          name="Testimonials"
          id={testimonialsSectionId}
          saveContent={saveContentWithSlug}
        />
        <EditSectionContentSimple
          content={content}
          name="About"
          id={aboutSectionId}
          saveContent={saveContentWithSlug}
        />
        <EditSectionContentWithImage
          content={content}
          name="Coach"
          id={coachSectionId}
          saveContent={saveContentWithSlug}
        />
        <EditFaqSection
          content={content}
          name="FAQ"
          id={faqSectionId}
          saveContent={saveContentWithSlug}
        />
      </Stack>
    </Container>
  );
};
