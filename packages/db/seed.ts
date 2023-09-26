import cliProgress from "cli-progress";

import { db, end } from "./connection";
import { LightcastSkill, getAccessToken, getSkills } from "./helpers/lightcast";
import {
  skillTable,
  skillTypeTable,
  skillCategoryTable,
  skillSubcategoryTable,
  Skill,
} from "./schemas/common/skill";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

type SkillType = (typeof lightcastSkills)[0]["type"];
type SkillCategory = (typeof lightcastSkills)[0]["category"];
type SkillSubcategory = (typeof lightcastSkills)[0]["subcategory"] & {
  categoryId: number;
};

const access_token = await getAccessToken();
const e = new OpenAIEmbeddings();

console.log("🛫");
console.log("Getting Lightcast Skills");

const lightcastSkills = await getSkills({ access_token });

const { skillCategories, skillSubcategories, skillTypes } =
  lightcastSkills.reduce(
    (
      { skillCategories, skillSubcategories, skillTypes },
      { category, subcategory, type }
    ) => {
      if (type && !skillTypes[type.id]) {
        skillTypes[type.id] = type;
      }

      if (category) {
        if (!skillCategories[category.id]) {
          skillCategories[category.id] = category;
        }
        if (subcategory && !skillSubcategories[subcategory.id]) {
          skillSubcategories[subcategory.id] = {
            ...subcategory,
            categoryId: category.id,
          };
        }
      }

      return { skillCategories, skillSubcategories, skillTypes };
    },
    {
      skillCategories: {} as Record<string, SkillCategory>,
      skillSubcategories: {} as Record<string, SkillSubcategory>,
      skillTypes: {} as Record<string, SkillType>,
    }
  );

console.log("📝");

console.log("Inserting Skill Types");
await db
  .insert(skillTypeTable)
  .values(Object.values(skillTypes))
  .onConflictDoNothing();

console.log("Inserting Skill Categories");
await db
  .insert(skillCategoryTable)
  .values(Object.values(skillCategories))
  .onConflictDoNothing();

console.log("Inserting Skill Subcategories");
await db
  .insert(skillSubcategoryTable)
  .values(Object.values(skillSubcategories))
  .onConflictDoNothing();

const mapSkill = async (skill: LightcastSkill): Promise<Skill> => {
  let nameEmbedding: number[];
  let descriptionEmbedding: number[] | null;
  try {
    nameEmbedding = await e.embedQuery(skill.name);

    descriptionEmbedding = skill.description
      ? await e.embedQuery(skill.description)
      : null;
  } catch (err) {
    console.error(`Error embedding ${skill.name} \n ${skill.description}}`);
    console.error(err);
    nameEmbedding = [];
    descriptionEmbedding = null;
  }

  mapsSkillBar.increment();

  return {
    description: skill.description || null,
    descriptionEmbedding,
    nameEmbedding,
    subcategoryId: skill.subcategory?.id || 100,
    typeId: skill.type.id,
    aliases: null,
    ...skill,
  };
};

console.log("Inserting Skills");

const mapsSkillBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
mapsSkillBar.start(lightcastSkills.length, 0);

const chunkSize = 512;
for (let i = 0; i < lightcastSkills.length; i += chunkSize) {
  const chunk = await Promise.all(
    lightcastSkills.slice(i, i + chunkSize).map(mapSkill)
  );

  await db.insert(skillTable).values(chunk).onConflictDoNothing();
}
mapsSkillBar.stop();

await end();
console.log("🛬");
