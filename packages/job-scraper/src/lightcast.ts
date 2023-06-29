import { writeFile } from "node:fs/promises";

import { getAccessToken, getSkills } from "./skills";

const skills = await getSkills({
  access_token: await getAccessToken(),
});

const categories = {};
const subcategories = {};
const types = {};

for (const { category, subcategory, type } of skills) {
  if (type && !type[type.id]) {
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

await writeFile("data/categories.json", JSON.stringify(categories), "utf-8");
await writeFile(
  "data/subcategories.json",
  JSON.stringify(subcategories),
  "utf-8"
);
await writeFile("data/types.json", JSON.stringify(types), "utf-8");
await writeFile("data/skills.json", JSON.stringify(skills), "utf-8");

console.log("done");
