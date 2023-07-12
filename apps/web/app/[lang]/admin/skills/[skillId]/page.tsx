import Link from "@app/link";
import { db } from "@octocoach/db/src/connection";
import { Container, Stack, Typography } from "@octocoach/ui";

export default async function Page({
  params,
}: {
  params: { skillId: string };
}) {
  const skill = await db.query.skills.findFirst({
    where: (skills, { eq }) => eq(skills.id, params.skillId),
    with: {
      subcategory: {
        with: {
          category: true,
        },
      },
      tasksToSkills: {
        with: {
          task: true,
        },
      },
    },
  });

  return (
    <Stack>
      <Typography>
        {skill.subcategory.category.name} - {skill.subcategory.name}
      </Typography>
      <Typography size="l">{skill.name}</Typography>
      <Typography>{skill.description}</Typography>
      <Typography>Software: {skill.isSoftware ? "yes" : "no"}</Typography>
      <Typography>Language: {skill.isLanguage ? "yes" : "no"}</Typography>
      <a href={skill.infoUrl}>Source</a>
      <Container element="div">
        <Typography size="l">Tasks</Typography>
        <Stack>
          {skill.tasksToSkills.map(({ task }) => (
            <Link href={`/admin/tasks/${task.id}`}>
              <Typography>{task.description}</Typography>
            </Link>
          ))}
        </Stack>
      </Container>
    </Stack>
  );
}
