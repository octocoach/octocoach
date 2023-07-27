import { eq, sql } from "@octocoach/db/src";
import { Database } from "@octocoach/db/src/connection";
import { makeCosineDistance } from "@octocoach/db/src/embedding";
import { Skill, skills } from "@octocoach/db/src/schema/skills";
import chalk from "chalk";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { z } from "zod";
import { createFunctionFromZodSchema } from "./helpers";

const attrName = "skill";

const saveSkill = createFunctionFromZodSchema({
  name: "save_skill",
  description: "save one skill",
  attrName,
  zodSchema: z
    .string()
    .describe("The name of the selected skill or `undefined`."),
});

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(`
    You will be provided with a description of a skill and a list of possible matches (delimited by tripple quotes) to select from.
    First, try to find the described skill in the list.
    If you find the described skill in the list, call the \`${saveSkill.name}\` function with only 1 matching skill from the list.
    If you don't finf the described skill in the list, call the \`${saveSkill.name}\` function with \`undefined\`.
  `),
  HumanMessagePromptTemplate.fromTemplate(`
    {description}
    
    """
    {possibleMatches}
    """
  `),
]);

const llm = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-4-0613",
});

const outputParser = new JsonKeyOutputFunctionsParser({ attrName });

const chain = new LLMChain({
  prompt,
  llm,
  llmKwargs: { functions: [saveSkill] },
  outputParser,
});

export const matchSkill = async ({
  db,
  description,
}: {
  db: Database;
  description: string;
}): Promise<Skill | null> => {
  console.log(`Finding ${chalk.blue(description)}`);
  const descriptionWithoutParens = description.replace(/\s*\([^)]*\)/g, "");

  let result = await db.query.skills.findFirst({
    where: (skills, { or, sql }) =>
      or(
        sql`${skills.name} ILIKE ${description}`,
        sql`${skills.name} ILIKE ${descriptionWithoutParens}`,
        sql`${description} ILIKE ANY(${skills.aliases})`,
        sql`${descriptionWithoutParens} ILIKE ANY(${skills.aliases})`
      ),
  });

  if (result) return result;

  console.log(chalk.cyan("Using Model"));

  const distance = await makeCosineDistance(description);

  const order = sql`
  CASE
    WHEN ${skills.descriptionEmbedding} IS NULL
    THEN (${distance(skills.nameEmbedding)})
    ELSE 
      (
        (${distance(skills.nameEmbedding)}) + 
        (${distance(skills.descriptionEmbedding)})
      ) / 2
  END`;

  const results = await db.select().from(skills).orderBy(order).limit(10);

  const possibleMatches = results.map(({ name }) => `- ${name}`).join("\n");

  const { text } = (await chain.call({
    description,
    possibleMatches,
  })) as {
    text: string;
  };

  const modelSelection = text.toString();

  if (modelSelection === "undefined") {
    console.log(chalk.yellow("Model returned undefined, returning null"));

    return null;
  }

  const selectedSkill = results.find((skill) => skill.name === modelSelection);

  if (selectedSkill) {
    const aliases = selectedSkill.aliases?.length
      ? [...selectedSkill.aliases, description]
      : [description];

    console.log(
      chalk.green(`Saving alias: ${description} -> ${selectedSkill.name}`)
    );

    await db
      .update(skills)
      .set({ aliases })
      .where(eq(skills.id, selectedSkill.id));

    return selectedSkill;
  }

  console.log(chalk.red("Model selection not found, returning null"));
  return null;
};
