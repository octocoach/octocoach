import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { JsonKeyOutputFunctionsParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { ZodSchema, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object.js";
import { Job } from "./interfaces";
import { Task } from "./schema";
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
  PromptTemplate.fromTemplate(`Save all tasks mentioned in the job posting below.

Only include tasks which fall within the general area of Web Application Development.

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

JOB POSTING:

Title: {title}

Description:

{description}
`);

const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-4-0613" });

const functions = createFunctionsFromZodSchema(
  z.object({
    description: z.string().describe("A description of the task"),
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
  title,
  description,
}: Pick<Job, "description" | "title">): Promise<Task[]> => {
  console.log(`Getting tasks for: ${title}`);

  const { text } = (await chain.call({
    title,
    description,
  })) as { text: Pick<Task, "description">[] };

  const tasks: Task[] = [];
  for (const task of text) {
    const embeddings = await embeddingsApi.embedQuery(task.description);
    tasks.push({ ...task, embeddings });
  }

  return tasks;
};
