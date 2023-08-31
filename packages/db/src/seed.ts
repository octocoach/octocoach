import { OpenAIEmbeddings } from "langchain/embeddings";
import cliProgress from "cli-progress";

import { db, end } from "./connection";
import { getAccessToken, getSkills } from "./helpers/lightcast";
import {
  Skill,
  skillCategories,
  skillSubcategories,
  skillTypes,
  skills,
} from "./schema/skills";

type SkillType = (typeof lightcastSkills)[0]["type"];
type SkillCategory = (typeof lightcastSkills)[0]["category"];
type SkillSubcategory = (typeof lightcastSkills)[0]["subcategory"] & {
  categoryId: number;
};

const access_token = await getAccessToken();

console.log("🛫");
console.log("Getting Lightcast Skills");

const lightcastSkills = await getSkills({ access_token });

const categories: Record<string, SkillCategory> = {};
const subcategories: Record<string, SkillSubcategory> = {};
const types: Record<string, SkillType> = {};
const skillsToInsert: Skill[] = [];

console.log("Getting Embeddings");

const e = new OpenAIEmbeddings();

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(lightcastSkills.length, 0);

for (const [
  i,
  { category, subcategory, type, name, description, ...skill },
] of lightcastSkills.entries()) {
  bar1.update(i);
  const nameEmbedding = await e.embedQuery(name);

  const descriptionEmbedding = description
    ? await e.embedQuery(description)
    : null;

  skillsToInsert.push({
    description: description || null,
    descriptionEmbedding,
    name,
    nameEmbedding,
    subcategoryId: subcategory?.id || 100,
    typeId: type.id,
    aliases: null,
    ...skill,
  });

  if (type && !types[type.id]) {
    types[type.id] = { ...type };
  }

  if (category) {
    if (!categories[category.id]) {
      categories[category.id] = { ...category };
    }

    if (subcategory && !subcategories[subcategory.id]) {
      subcategories[subcategory.id] = {
        ...subcategory,
        categoryId: category.id,
      };
    }
  }
}
bar1.stop();

console.log("Seeding Skill Types");
await db.insert(skillTypes).values(Object.values(types));
console.log("Seeding Skill Categories");
await db.insert(skillCategories).values(Object.values(categories));
console.log("Seeding Skill Subcategories");
await db.insert(skillSubcategories).values(Object.values(subcategories));

const chunkSize = 1000;
console.log("Seeding Skills");

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar2.start(skillsToInsert.length, 0);

for (let i = 0; i < skillsToInsert.length; i += chunkSize) {
  bar2.update(i);
  await db.insert(skills).values(skillsToInsert.slice(i, i + chunkSize));
}

bar2.stop();

console.log("🛬");

await end();
