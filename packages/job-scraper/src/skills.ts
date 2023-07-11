import { db } from "@octocoach/db/src/connection";
import { makeCosineDistance } from "@octocoach/db/src/embedding";
import { skills } from "@octocoach/db/src/schema/skills";

export const extractSkills = async (description: string) => {
  const distance = await makeCosineDistance(description);

  const relatedSkills = await db.query.skills.findMany({
    limit: 100,
    orderBy: distance(skills.nameEmbedding),
  });

  return relatedSkills.reduce(
    (acc, curr) => `${acc}\n${curr.id},${curr.name}`,
    "id,name"
  );
};
