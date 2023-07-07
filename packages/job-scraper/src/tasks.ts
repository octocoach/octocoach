import { type Database } from "@octocoach/db/src/connection";
import { Job } from "@octocoach/db/src/schema/jobs";
import { tasks } from "@octocoach/db/src/schema/tasks";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
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

const prompt =
  PromptTemplate.fromTemplate(`Save all tasks mentioned along with the skills required to do them in the job posting below.

Only include tasks which fall within the general area of Web Application Development.

When saving a task, include the task description and an array of skill ids (ONLY INCLUDE IDs THAT APPEAR IN THE SKILLS LIST)

Tasks should be written in the format:
   "Verb Noun ..."

Tasks should not start with "You...".

Complex tasks should be decomposed into their most basic form.

e.g.

- "Stay up to date with the latest technology and exchange experiences and information about technical innovations with your colleagues."

Should be:
- "Stay up to date with the latest technology."
- "Exchange experiences and information about technical innovations with your colleagues."

Tasks should be understandable when read outside of the context of the job posting.
Do not include references to "our software", "our platform", "the process",  etc.
But rather objective stand-alone descriptions of tasks using generic terms like "software", "a platform", "a process", etc.
Do not confuse qualifications or skills as tasks. i.e. "Have a lot of experience with Vue.js" is not a task. Tasks should only be things that are performed as a part of this job

## Examples:

### Good:

- "Develop web applications using JavaScript."
- "Write and publish technical articles"

### Bad:

- "You web applications using JavaScript."
- "Developing web applications using JavaScript."
- "Write and publish articles on all our brands using one technology"


---

SKILLS LIST:

\`\`\`csv
{skills}
\`\`\`

JOB POSTING:

Title: {title}

Description:

{description}
`);

const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-4-0613" });

const functions = createFunctionsFromZodSchema(
  z.object({
    description: z.string().describe("A description of the task"),
    skills: z.array(z.string(), {
      description: "A list of IDs of skills, which appear in the SKILLS LIST",
    }),
  })
);

const outputParser = new JsonKeyOutputFunctionsParser({ attrName: "tasks" });

const chain = new LLMChain({
  prompt,
  llm,
  llmKwargs: { functions },
  outputParser,
});

export const extractTasks = async ({
  db,
  job,
  skills,
}: {
  db: Database;
  job: Job;
  skills: string;
}) => {
  const { title, description } = job;
  console.log(`Getting tasks for: ${title}`);

  const { text } = (await chain.call({
    title,
    description,
    skills,
  })) as {
    text: {
      description: string;
      skills: string[];
    }[];
  };

  console.log(text);

  for (const newTask of text) {
    const embedding = await embeddingsApi.embedQuery(newTask.description);
    const task = await db
      .insert(tasks)
      .values({ ...newTask, embedding, job: job.id })
      .returning();

    // ToDo: Here we will create the links between the skills and tasks and persist to the db
  }
};
