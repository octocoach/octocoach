import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { Job } from "./interfaces";

const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(`
  You are a labor market analyst that extracts a list of tasks from a given job description.
  Only lists tasks that fit within the general area of web application development.
  Do not list any job or company benefits as tasks!!!
  Each task should be on its own line, always starting on a new line.
  The tasks should be in plain text (not markdown), and not have a '-' at the start.
  Only provide the list of tasks. Nothing else!
    `),
  HumanMessagePromptTemplate.fromTemplate(`Please exract a list tasks this job requires:
---
"""
Titie: {title}

Description:
{description}

"""

Remember - Do not list any job or company benefits as tasks.

Remember to only provide the list of tasks and no other text`),
]);

const llm = new ChatOpenAI({ temperature: 0 });

const chain = new LLMChain({
  prompt,
  llm,
});

export const extractTasks = async ({
  title,
  description,
}: Pick<Job, "description" | "title">): Promise<string[]> => {
  console.log(`Getting tasks for: ${title}`);
  const response = await chain.call({ title, description });
  console.log("response", response);
  return response.text.split("\n");
};
