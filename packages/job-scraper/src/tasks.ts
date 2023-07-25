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
    Analyse the job posting and identify explicit duties (tasks) mentioned in the job description.
    Each duty should describe an activity or responsibility a candidate would be expected to perform.
    The tasks should not only be about the technologies to be used, but also provide context about the project and industry where applicable.
    Avoid generating tasks that simply state the use of certain technologies with verbs like "work with", "use", "learn", or "understand". Instead, incorporate these technologies into specific responsibilities or activities. For example, instead of "Work with .NET", use "Develop applications using .NET".
    When describing the industry or business context, use indefinite articles (like 'an' or 'a') to keep the task general rather than specific to a single company.
    Try to embed the project or industry context into the task description to help provide a more comprehensive understanding of the duty.
    Remember, each task description should be clear and self-explanatory, providing a meaningful understanding of the task even when read out of context.
    Avoid extrapolating or assuming responsibilities that are not explicitly mentioned in the job description.
    Do not include the name of the company or any internal software names of this company.
    Use the provided \`save_tasks\` function to save the list of duties along with a list of descriptors for skills required to complete the duty.
    Skill descriptors could be hard skills like "JavaScript (Programming Language)" or "PHP (Scripting Language)" or soft skills like "Interpersonal Communications (Soft Skill)" or "Conflict Resolution (Soft Skill)".
    Avoid ambiguous skill names, instead use descriptions that would closely match the skill's description in a database using a cosine distance to the embedding.
    Use any programming languages, databases, frameworks, libraries or any other tools mentioned in the job description combined with your general knowledge as a CTO to make an informed guess about what skills are needed for the task.
  `),
  HumanMessagePromptTemplate.fromTemplate(`
  {title}

  {description}
  `),
]);

const llm = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4-0613" });

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
  console.log(`Job: ${title}`);

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
    console.log("Task: ", description);

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
          console.log(`Skill: ${skillDescriptor} -> ${skill.name}`);
          await db.insert(tasksToSkills).values({ taskId, skillId: skill.id });
        } catch (e) {
          console.error(`Error inserting ${taskId} <=> ${skillDescriptor}`);
        }
      } else {
        console.error(`No skill for descriptor ${skillDescriptor}`);
      }
    }
  }
};
