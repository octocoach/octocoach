import { ContentLocale, SectionId } from "@octocoach/db/schemas/org/content";
import { Container, EditSectionContentSimple, Text } from "@octocoach/ui";
import { saveContent } from "src/actions/content";

export const EditMission = ({
  content,
  slug,
}: {
  content: ContentLocale[];
  slug: string;
}) => {
  const missionSectionId: SectionId = "mission";
  const saveContentWithSlug = saveContent.bind("slug", slug);

  return (
    <Container>
      <Text>Mission Statement</Text>

      <EditSectionContentSimple
        content={content}
        name="Mission Statement"
        id={missionSectionId}
        saveContent={saveContentWithSlug}
      />
    </Container>
  );
};
