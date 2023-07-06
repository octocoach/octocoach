import { db, end } from "@octocoach/db/src/connection";
import { skills } from "@octocoach/db/src/schema/skills";
import { cosineDistance, makeCosineDistance } from "@octocoach/db/src/vector";

export default async function Page() {
  const distance = await makeCosineDistance(" ");

  const s = await db.query.skills.findMany({
    limit: 10,
    orderBy: distance(skills.nameEmbedding),
  });

  return (
    <section>
      {s.map((k) => (
        <p>{k.name}</p>
      ))}
    </section>
  );
}
