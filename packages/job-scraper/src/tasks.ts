import { type Database } from "@octocoach/db/src/connection";
import { Job } from "@octocoach/db/src/schema/jobs";
import { tasks } from "@octocoach/db/src/schema/tasks";
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
import { matchSkill } from "./skills";

const embeddingsApi = new OpenAIEmbeddings();

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    [
      "You will be provided with a job posting.",
      "First, Analyse it and identify all duties (tasks) mentioned.",
      "Each task describes an activity or responsibility a candidate would be expected to perform.",
      "The task description should include context about the type of work, project, industry and tools used where possible.",
      "Try to embed the project or industry context into the task description to help provide a more comprehensive understanding of the duty.",
      'Avoid generating tasks that simply state the use of certain technologies with verbs like "work with", "use", "learn", or "understand".',
      "Instead, incorporate these technologies into specific responsibilities or activities.",
      'For example, instead of "Work with .NET", use "Develop back-end services for a parking system using .NET".',
      "When describing the industry or business context, use indefinite articles (like 'an' or 'a') to keep the task general rather than specific to a single company.",
      "Each task description should be written in English and be clear and self-explanatory, providing a meaningful understanding of the task even when read out of context.",
      "Avoid extrapolating or assuming responsibilities that are not mentioned in the job description.",
      "Do not include the name of the company!",
      "Next, phrase the task description as a yes/no question to gaugue the user's interest (not ability) in performing it.",
      "The question should be phrased in such a way that a yes response indicates an interest in doing the task and a no indicates disinterest.",
      'Questions could be prased as "Would you like to...", "Are you willing to...", "Would you be interested in...", "Are you open to...".',
      "Use all available context information from the job posting to formulate the question in such a way that the person answering yes/no can make an informed decision when it's read on its",
      "Use the provided function to save the list of duty description and questions along with an extensive list of descriptors for skills required to complete the duty.",
      'Skill descriptors could be hard skills like "JavaScript (Programming Language)" or "PHP (Scripting Language)" or soft skills like "Interpersonal Communications (Soft Skill)" or "Conflict Resolution (Soft Skill)".',
      "Avoid ambiguous skill names, instead use descriptions that would closely match the skill's description in a database using a cosine distance to the embedding.",
      "Use any tools or technologies mentioned in the job description combined with your general knowledge to make an informed guess about the skills needed to complete task.",
    ].join(" ")
  ),
  HumanMessagePromptTemplate.fromTemplate("{title}\n\n{description}"),
]);

const llm = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4-0613" });

const attrName = "tasks";

const saveTasks = createFunctionFromZodSchema({
  name: "save_tasks",
  description: "Save a list of tasks",
  attrName,
  zodSchema: z.object({
    description: z.string().describe("A description of the task"),
    question: z
      .string()
      .describe("The description, phrased as a yes/no question"),
    skills: z.array(z.string()).describe("An array of skill descriptors"),
  }),
});

const outputParser = new JsonKeyOutputFunctionsParser({ attrName });

const chain = new LLMChain({
  prompt,
  llm,
  llmKwargs: {
    functions: [saveTasks],
    function_call: {
      name: saveTasks.name,
    },
  },
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
      question: string;
      skills: string[];
    }[];
  };

  for (const { description, question, skills } of text) {
    console.log(chalk.bgWhite(chalk.black(`Task:  ${description}`)));
    console.log(chalk.bgBlue(chalk.yellowBright(`Question: ${question}`)));

    const embedding = await embeddingsApi.embedQuery(description);

    const task = await db
      .insert(tasks)
      .values({ description, question, embedding, jobId: job.id })
      .returning();

    const taskId = task[0].id;

    for (const description of skills) {
      await matchSkill({
        db,
        description,
        taskId,
      });
    }
  }
};
