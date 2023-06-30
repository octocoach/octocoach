import { db, end } from "./connection";
import { skillTypes } from "./schema/skills";

const s = await db.select().from(skillTypes);

for (const { id, name } of s) {
  console.log(`${id}: ${name}`);
}

await end();
