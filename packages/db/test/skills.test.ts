import { test, suite } from "uvu";
import * as assert from "uvu/assert";
import { db, end } from "../src/connection";
import { makeCosineDistance } from "../src/embedding";
import { skills } from "../src/schema/skills";
import { sql } from "drizzle-orm";

const limit = 7;
const expected: Record<string, string[]> = {
  KSDJCA4E89LB98JAZ7LZ: ["React (Library)", "React.js"],
  KS1200771D9CR9LB4MWW: ["JavaScript", "JS"],
  KS1200C5XQWW78VQ5ZYL: ["php", "PHP (Programming Language)"],
  KS441LF7187KS0CV4B6Y: ["TypeScript", "TypeScript (Programming Language)"],
};

for (const [id, terms] of Object.entries(expected)) {
  test(id, async () => {
    for (const term of terms) {
      const distance = await makeCosineDistance(term);

      const result = await db
        .select({
          id: skills.id,
          name: skills.name,
          distanceName: distance(skills.nameEmbedding),
          distanceDescription: distance(skills.descriptionEmbedding),
        })
        .from(skills)
        .orderBy(
          sql`
          CASE
            WHEN ${skills.descriptionEmbedding} IS NULL
            THEN (${distance(skills.nameEmbedding)})
            ELSE ((${distance(skills.nameEmbedding)}) + (${distance(
            skills.descriptionEmbedding
          )})) / 2
          END`
        )
        .limit(limit);

      assert.ok(
        result.map(({ id }) => id).includes(id),
        `"${term}" does not appear in the first ${limit} results.`
      );
    }
  });
}

test.after(async () => {
  await end();
});

test.run();
