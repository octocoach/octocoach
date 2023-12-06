import { Database } from "@octocoach/db/connection";
import { Job } from "@octocoach/db/schemas/common/job";
import { taskTable } from "@octocoach/db/schemas/common/task";
import chalk from "chalk";
import OpenAI from "openai";
import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { getEmbeddings } from "./embeddings";
import { makeToolChoice, zodParseJSON } from "./helpers";
import { matchSkill } from "./skills";

const openai = new OpenAI();

const SaveParams = z.object({
  tasks: z
    .array(
      z.object({
        description: z.string().describe("A description of the task"),
        question: z
          .string()
          .describe("The description, phrased as a yes/no question"),
        skills: z.array(z.string()).describe("An array of skill descriptors"),
      })
    )
    .describe("An array of tasks with skills required to complete them"),
});

const systemMessageContent = [
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
  "You should aim for about 5 tasks per job posting.",
  "If you are unable to generate 5 tasks, use the job title to generate tasks that could reasonably be expected of someone in that role.",
  "Do not include the name of the company!",
  "Next, phrase the task description as a yes/no question to gauge the user's interest (not ability) in performing the task.",
  "The question should be phrased in such a way that a yes response indicates an interest in doing the task and a no indicates disinterest.",
  'Questions could be phrased as "Would you like to...", "Are you willing to...", "Would you be interested in...", "Are you open to...".',
  "Use all available context information from the job posting to formulate the question in such a way that the person answering yes/no can make an informed decision when it's read on its own.",
  "Use the provided function to save the list of duty description and questions along with an extensive list of descriptors for skills required to complete the duty.",
  'Skill descriptors could be hard skills like "JavaScript (Programming Language)" or "PHP (Scripting Language)" or soft skills like "Interpersonal Communications (Soft Skill)" or "Conflict Resolution (Soft Skill)".',
  "Avoid ambiguous skill names, instead use descriptions that would closely match the skill's description in a database using a cosine distance to the embedding.",
  "Use any tools or technologies mentioned in the job description combined with your general knowledge to make an informed guess about the skills needed to complete task.",
].join(" ");

export const extractTasks = async ({
  job,
  db,
}: {
  job: Pick<Job, "id" | "title" | "description">;
  db: Database;
}) => {
  const saveTasksTool = {
    type: "function",
    function: {
      name: "save",
      description: "save a list of tasks to the database",
      parameters: zodToJsonSchema(SaveParams),
      function: save,
      parse: zodParseJSON(SaveParams),
    },
  } as RunnableToolFunction<z.infer<typeof SaveParams>>;

  async function save({ tasks }: z.infer<typeof SaveParams>) {
    for (const { description, question, skills } of tasks) {
      console.log(chalk.bgWhite(chalk.black(`Task:  ${description}`)));
      console.log(chalk.bgBlue(chalk.yellowBright(`Question: ${question}`)));

      const embedding = await getEmbeddings(description);

      const taskId = await db
        .insert(taskTable)
        .values({
          description,
          question,
          embedding,
          jobId: job.id,
        })
        .returning()
        .then((rows) => rows[0].id);

      for (const description of skills) {
        await matchSkill({ db, description, taskId });
      }
    }
  }

  const runner = openai.beta.chat.completions.runTools({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: systemMessageContent,
      },
      {
        role: "user",
        content: `JOB TITLE: ${job.title}\n\nDESCRIPTION:\n${job.description}`,
      },
    ],
    tools: [saveTasksTool],
    tool_choice: makeToolChoice(saveTasksTool),
  });

  await runner.done();
};
