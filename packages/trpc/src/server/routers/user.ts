import { db } from "@octocoach/db/src/connection";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  summary: publicProcedure.input(z.string()).query(async ({ input }) => {
    const chat = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4" });

    const user = await db.query.users.findFirst({
      with: {
        usersTasksInterest: {
          with: { task: true },
        },
      },
      where: (users, { eq }) => eq(users.id, input),
    });

    const getQuestions = (answer: "yes" | "no" | "maybe") => {
      const i = answer === "yes" ? 1 : answer === "no" ? -1 : 0;
      if (!user) throw Error("no User!");
      return user.usersTasksInterest.filter((d) => d.interest === i);
    };

    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        [
          "You are a career coaching assistant.",
          `You will be provided with a list of questions along with the answer provided a coachee.`,
          "The coachee could only choose 'yes', 'no' or 'I don't know' as an answer",
          "The answers will be provided in the format Answer\n - Question 1\n - Question 2\n - etc...",
          "Based on the coachee's answers, write a paragraph of around 250 words that describes the coachee's ideal job.",
        ].join(" ")
      ),
      HumanMessagePromptTemplate.fromTemplate(
        "Yes:\n{yes}\nNo:\n{no}\nMaybe:\n{maybe}"
      ),
    ]);

    const taskChain = new LLMChain({ prompt, llm: chat });

    const { text } = await taskChain.call({
      yes: getQuestions("yes").map((q) => `- ${q.task.question}\n`),
      no: getQuestions("no").map((q) => `- ${q.task.question}\n`),
      maybe: getQuestions("maybe").map((q) => `- ${q.task.question}\n`),
    });

    return text;
  }),
});
