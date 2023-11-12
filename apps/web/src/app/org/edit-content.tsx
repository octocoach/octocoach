import { ContentLocale } from "@octocoach/db/schemas/org/content";
import {
  Container,
  EditSectionContentSimple,
  EditSectionContentWithImage,
  EditSectionContentWithSubSections,
  Stack,
  Text,
  aboutSectionId,
  coachSectionId,
  heroSectionId,
  methodSectionId,
} from "@octocoach/ui";
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
          name="Method"
          id={methodSectionId}
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
      </Stack>
    </Container>
  );
};
