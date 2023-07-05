import { db, end } from "./connection";
import { getAccessToken, getSkills } from "./helpers/lightcast";
import {
  skillCategories,
  skillSubcategories,
  skillTypes,
  skills,
} from "./schema/skills";

const access_token = await getAccessToken();

console.log("🛫");

const lightcastSkills = await getSkills({ access_token });

type SkillType = (typeof lightcastSkills)[0]["type"];
type SkillCategory = (typeof lightcastSkills)[0]["category"];
type SkillSubcategory = (typeof lightcastSkills)[0]["subcategory"] & {
  category: number;
};

const categories: Record<string, SkillCategory> = {};
const subcategories: Record<string, SkillSubcategory> = {};
const types: Record<string, SkillType> = {};

for (const { category, subcategory, type } of lightcastSkills) {
  if (type && !types[type.id]) {
    types[type.id] = { ...type };
  }

  if (category) {
    if (!categories[category.id]) {
      categories[category.id] = { ...category };
    }

    if (subcategory && !subcategories[subcategory.id]) {
      subcategories[subcategory.id] = { ...subcategory, category: category.id };
    }
  }
}

console.log("Seeding Skill Types");
await db.insert(skillTypes).values(Object.values(types));
console.log("Seeding Skill Categories");
await db.insert(skillCategories).values(Object.values(categories));
console.log("Seeding Skill Subcategories");
await db.insert(skillSubcategories).values(Object.values(subcategories));
const skillsToInsert = lightcastSkills.map((s) => ({
  id: s.id,
  name: s.name,
  subcategory: s.subcategory?.id || 100,
  description: s.description,
  infoUrl: s.infoUrl,
  isLanguage: s.isLanguage,
  isSoftware: s.isSoftware,
}));

const chunkSize = 1000;
console.log("Seeding Skills");

for (let i = 0; i < skillsToInsert.length; i += chunkSize) {
  console.log("Chunk " + i);
  await db.insert(skills).values(skillsToInsert.slice(i, i + chunkSize));
}

console.log("🛬");

// await db.insert(skillTypes).values([
//   { id: "ST1", name: "Specialized Skill" },
//   { id: "ST3", name: "Certification" },
//   { id: "ST2", name: "Common Skill" },
// ]);

await end();

// Fixing the code
