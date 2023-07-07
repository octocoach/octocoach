import { db } from "@octocoach/db/src/connection";
import { makeCosineDistance } from "@octocoach/db/src/embedding";
import { Skill, skills } from "@octocoach/db/src/schema/skills";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { ZodSchema, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object";

export const createFunctionsFromZodSchema = (zodSchema: ZodSchema) => {
  const { type, properties, required } = zodToJsonSchema(
    zodSchema
  ) as JsonSchema7ObjectType;

  return [
    {
      name: "save_skills",
      description:
        "Save a list of skills relating to the job posting. Takes an array id skills `id`s as parameter",
      parameters: {
        type: "object",
        properties: {
          skills: {
            type: "array",
            items: {
              type,
              properties,
              required,
            },
          },
        },
        required: ["skills"],
      },
    },
  ];
};

const prompt =
  PromptTemplate.fromTemplate(`Save all skills from the list below which are needed for the job posting below.
  When saving the skills, provide the \`id\` as parameter, NOT the \`name\`!

  SKILLS LIST:

  \`\`\`csv
  {skills}
  \`\`\`

  JOB POSTING:
  
  {description}
`);

const functions = createFunctionsFromZodSchema(
  z.string({ description: "The skill ID" })
);

const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-4-0613" });

const outputParser = new JsonKeyOutputFunctionsParser({ attrName: "skills" });

const chain = new LLMChain({
  prompt,
  llm,
  llmKwargs: { functions },
  outputParser,
});

export const extractSkills = async (description: string) => {
  console.log("extracting skills");
  const distance = await makeCosineDistance(description);

  const relatedSkills = await db.query.skills.findMany({
    limit: 50,
    orderBy: distance(skills.nameEmbedding),
  });

  const csv = relatedSkills.reduce(
    (acc, curr) => `${acc}\n${curr.id},${curr.name}`,
    "id,name"
  );
  console.log("csv", csv);

  const { text } = (await chain.call({ skills: csv, description })) as {
    text: Pick<Skill, "id">;
  };
  console.log("done");
  console.log(text);
};
