import { db } from "@octocoach/db/src/connection";
import { makeCosineDistance } from "@octocoach/db/src/embedding";
import { skills } from "@octocoach/db/src/schema/skills";
import { Container, Stack, Text } from "@octocoach/ui";

export default async function Page() {
  const distance = await makeCosineDistance(`coaching`);

  const s = await db.query.skills.findMany({
    limit: 100,
    orderBy: distance(skills.nameEmbedding),
  });

  return (
    <Container element="section">
      <Stack spacing="loose">
        {s.map((k) => (
          <div key={k.id}>
            <Text size="m">{k.name}</Text>
            <p>{k.description}</p>
          </div>
        ))}
      </Stack>
    </Container>
  );
}
