import { type Database } from "@octocoach/db/src/connection";
import { makeCosineDistance } from "@octocoach/db/src/embedding";
import { Job } from "@octocoach/db/src/schema/jobs";
import { skills as skillsSchema } from "@octocoach/db/src/schema/skills";
import { tasks } from "@octocoach/db/src/schema/tasks";
import { tasksToSkills } from "@octocoach/db/src/schema/tasks-to-skills";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ZodSchema, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object.js";

const embeddingsApi = new OpenAIEmbeddings();

export const createFunctionsFromZodSchema = (zodSchema: ZodSchema) => {
  const { type, properties, required } = zodToJsonSchema(
    zodSchema
  ) as JsonSchema7ObjectType;

  return [
    {
      name: "save_tasks",
      description: "Save a list of tasks",
      parameters: {
        type: "object",
        properties: {
          tasks: {
            type: "array",
            items: {
              type,
              properties,
              required,
            },
          },
        },
        required: ["tasks"],
      },
    },
  ];
};

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(`
    You are an experienced CTO.
    You will be provided with a job posting.
    Analyse the job posting and save a list of duties (tasks) explicitly mentioned in the job description.
    Only include duties which would be relevant and meaningful to a potential cantidate for this position.
    Do not include duties which are too obvious or generic to have any real impact on the position.
    Use the provided \`save_tasks\` function to save the list of duties along with a list of descriptors for skills required to complete the duty.
    Skills could be hard skills like "JavaScript" or "PHP" or soft skills like "Communication" or "Conflict Resolution"
  `),
  HumanMessagePromptTemplate.fromTemplate(`
  {title}

  {description}
  `),
]);

const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-4-0613" });

const functions = createFunctionsFromZodSchema(
  z.object({
    description: z.string().describe("A description of the task"),
    skills: z.array(z.string()).describe("An array of skill descriptors"),
  })
);

const outputParser = new JsonKeyOutputFunctionsParser({ attrName: "tasks" });

const chain = new LLMChain({
  prompt,
  llm,
  llmKwargs: { functions },
  outputParser,
});

export const extractTasks = async ({ db, job }: { db: Database; job: Job }) => {
  const { title, description } = job;
  console.log(`Getting tasks for: ${title}`);

  const { text } = (await chain.call({
    title,
    description,
    timeout: 5 * 60 * 1000, // 5 minutes
  })) as {
    text: {
      description: string;
      skills: string[];
    }[];
  };

  for (const { description, skills } of text) {
    const embedding = await embeddingsApi.embedQuery(description);
    console.log("Inserting", description);

    const task = await db
      .insert(tasks)
      .values({ description, embedding, jobId: job.id })
      .returning();

    const taskId = task[0].id;

    for (const skillDescriptor of skills) {
      const distance = await makeCosineDistance(skillDescriptor);
      const skill = await db.query.skills.findFirst({
        orderBy: distance(skillsSchema.nameEmbedding),
      });

      if (skill) {
        try {
          await db.insert(tasksToSkills).values({ taskId, skillId: skill.id });
        } catch (e) {
          console.error(`Error inserting ${taskId} <=> ${skillDescriptor}`);
        }
      } else {
        console.error(`No skill for descriptor ${skillDescriptor}`);
      }
    }

    console.log(`Inserted Task ${taskId}`);
  }
};
