import { type Database } from "@octocoach/db/connection";
import { eq, sql } from "@octocoach/db/operators";
import { skillsMissingTasksTable } from "@octocoach/db/schemas/common/skills-missing-tasks";
import { skillsTasksTable } from "@octocoach/db/schemas/common/skills-tasks";
import { makeCosineDistance } from "@octocoach/db/schemas/data-types/embedding";
import { skillMissingTable } from "@octocoach/db/schemas/public/schema";
import { skillTable } from "@octocoach/db/schemas/public/skill";
import chalk from "chalk";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { z } from "zod";
import { createFunctionFromZodSchema } from "./helpers";

const createSkillMissing = async (description: string, db: Database) => {
  console.log(chalk.yellow("Model returned undefined, returning null"));

  const embeddingsApi = new OpenAIEmbeddings();

  const embedding = await embeddingsApi.embedQuery(description);

  return (
    await db
      .insert(skillMissingTable)
      .values({
        name: description,
        embedding,
      })
      .returning()
  )[0];
};

const findWithStringMatch = async (description: string, db: Database) => {
  const removeParens = (input: string) => input.replace(/\s*\([^)]*\)/g, "");

  return db.query.skillTable.findFirst({
    where: (skills, { or, sql }) =>
      or(
        sql`${skills.name} ILIKE ${description}`,
        sql`${skills.name} ILIKE ${removeParens(description)}`,
        sql`${description} ILIKE ANY(${skills.aliases})`,
        sql`${removeParens(description)} ILIKE ANY(${skills.aliases})`
      ),
  });
};

const findWithLLM = async (description: string, db: Database) => {
  console.log(chalk.cyan("Using LLM"));

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

  const distance = await makeCosineDistance(description);

  const order = sql`
  CASE
    WHEN ${skillTable.descriptionEmbedding} IS NULL
    THEN (${distance(skillTable.nameEmbedding)})
    ELSE 
      (
        (${distance(skillTable.nameEmbedding)}) + 
        (${distance(skillTable.descriptionEmbedding)})
      ) / 2
  END`;

  const results = await db.select().from(skillTable).orderBy(order).limit(10);

  const possibleMatches = results.map(({ name }) => `- ${name}`).join("\n");

  const { text } = (await chain.call({
    description,
    possibleMatches,
  })) as {
    text: string;
  };

  const modelSelection = text.toString();

  if (modelSelection === "undefined") return;

  const selectedSkill = results.find(({ name }) => name === modelSelection);

  if (selectedSkill) {
    const aliases = selectedSkill.aliases?.length
      ? [...selectedSkill.aliases, description]
      : [description];

    console.log(
      chalk.green(`Saving alias: ${description} -> ${selectedSkill.name}`)
    );

    await db
      .update(skillTable)
      .set({ aliases })
      .where(eq(skillTable.id, selectedSkill.id));

    return selectedSkill;
  }
};

const findSkillMissing = async (description: string, db: Database) =>
  db.query.skillMissingTable.findFirst({
    where: (skillsMissing, { eq }) => eq(skillsMissing.name, description),
  });

export const matchSkill = async ({
  db,
  description,
  taskId,
}: {
  db: Database;
  description: string;
  taskId: number;
}) => {
  console.log(`Finding ${chalk.blue(description)}`);

  const skillMissing = await findSkillMissing(description, db);
  if (skillMissing) {
    await db.insert(skillsMissingTasksTable).values({
      taskId,
      skillMissingId: skillMissing.id,
    });
    console.log(
      chalk.red(`Missing Skill: ${description} -> ${skillMissing.name}`)
    );
    return;
  }

  const skill =
    (await findWithStringMatch(description, db)) ||
    (await findWithLLM(description, db));

  if (skill) {
    await db.insert(skillsTasksTable).values({ taskId, skillId: skill.id });
    console.log(chalk.magenta(`Skill: ${description} -> ${skill.name}`));
    return;
  }

  const newSkillMissing = await createSkillMissing(description, db);
  await db.insert(skillsMissingTasksTable).values({
    taskId,
    skillMissingId: newSkillMissing.id,
  });
  console.log(
    chalk.redBright(
      `New Missing Skill: ${description} -> ${newSkillMissing.name}`
    )
  );
};
