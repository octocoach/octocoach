import { type Database } from "@octocoach/db/connection";
import { eq, sql } from "@octocoach/db/operators";
import { skillsMissingTasksTable } from "@octocoach/db/schemas/common/skills-missing-tasks";
import { skillsTasksTable } from "@octocoach/db/schemas/common/skills-tasks";
import {
  AnyColumn,
  cosineDistance,
} from "@octocoach/db/schemas/data-types/embedding";
import { skillMissingTable } from "@octocoach/db/schemas/public/schema";
import { skillTable } from "@octocoach/db/schemas/public/skill";
import chalk from "chalk";
import OpenAI from "openai";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { getEmbeddings } from "./embeddings";
import { makeToolChoice, zodParseJSON } from "./helpers";

const openai = new OpenAI();

const SaveSkillParams = z.object({
  skill: z
    .string()
    .optional()
    .describe("The name of the selected skill or `undefined`."),
  matchFound: z.boolean().describe("Whether a suitable match was found"),
});

export const makeCosineDistance = async (input: string) => {
  const inputEmbeddings = await getEmbeddings(input);

  return (column: AnyColumn) => cosineDistance(column, inputEmbeddings);
};

const createSkillMissing = async (description: string, db: Database) => {
  console.log(chalk.yellow("Model returned undefined, returning null"));

  const embedding = await getEmbeddings(description);

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

const findWithLLM = async (
  description: string,
  taskId: number,
  db: Database
) => {
  console.log(chalk.cyan("Using LLM"));

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

  const results = await db.select().from(skillTable).orderBy(order).limit(25);

  const possibleMatches = results.map(({ name }) => `- ${name}`).join("\n");

  const saveSkillTool = {
    type: "function",
    function: {
      name: "save_skill",
      description: "save one skill",
      parameters: zodToJsonSchema(SaveSkillParams),
      function: saveSkill,
      parse: zodParseJSON(SaveSkillParams),
    },
  } as RunnableToolFunction<z.infer<typeof SaveSkillParams>>;

  async function saveSkill({
    skill,
    matchFound,
  }: z.infer<typeof SaveSkillParams>) {
    if (matchFound && skill) {
      const selectedSkill = results.find(({ name }) => name === skill);

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

        await db
          .insert(skillsTasksTable)
          .values({ taskId, skillId: selectedSkill.id })
          .onConflictDoNothing();

        console.log(
          chalk.magenta(`Skill: ${description} -> ${selectedSkill.name}`)
        );
        return;
      }
    }
    console.log(chalk.bgRed(chalk.white(`No match found for: ${description}`)));

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
  }

  const runner = openai.beta.chat.completions.runTools({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You will be provided with a description of a skill and a list of possible matches (delimited by tripple quotes) to select from.
    Save the skill that best matches the description.
    If the skill is not in the list, save \`undefined\`.`,
      },
      {
        role: "user",
        content: `${description}\n\n"""${possibleMatches}"""`,
      },
    ],
    tools: [saveSkillTool],
    tool_choice: makeToolChoice(saveSkillTool),
  });

  await runner.done();
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

  const skill = await findWithStringMatch(description, db);

  if (skill) {
    await db.insert(skillsTasksTable).values({ taskId, skillId: skill.id });
    console.log(chalk.magenta(`Skill: ${description} -> ${skill.name}`));
    return;
  }

  await findWithLLM(description, taskId, db);
};
