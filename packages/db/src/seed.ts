import { db, end } from "./connection";
import { skillTypes } from "./schema/skills";

await db.insert(skillTypes).values([
  { id: "ST1", name: "Specialized Skill" },
  { id: "ST3", name: "Certification" },
  { id: "ST2", name: "Common Skill" },
]);

await end();
