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
import { clerkClient } from "@clerk/nextjs";
import { createHash } from "node:crypto";
import { users } from "@octocoach/db/src/schema/users";
import { eq } from "@octocoach/db/src";

export const userRouter = router({
  summary: publicProcedure.input(z.string()).query(async ({ input }) => {
    const chat = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4" });

    const clerkUser = await clerkClient.users.getUser(input);

    const user = await db.query.users.findFirst({
      with: {
        usersTasksInterest: {
          with: { task: true },
        },
      },
      where: (users, { eq }) => eq(users.id, input),
    });

    const hash = createHash("sha256")
      .update(JSON.stringify(user?.usersTasksInterest ?? []))
      .digest("hex");

    if (user?.summaryHash === hash) {
      console.log("Summary cache hit!");
      return user.summary;
    }

    const getQuestions = (answer: "yes" | "no" | "maybe") => {
      const i = answer === "yes" ? 1 : answer === "no" ? -1 : 0;
      if (!user) throw Error("No User!");
      return user.usersTasksInterest.filter((d) => d.interest === i);
    };

    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        [
          "You are a career coaching assistant.",
          "You will be provided with a list of questions along with the answers provided by {name}, a coachee.",
          "{name} could only choose 'yes', 'no' or 'I don't know' as an answer",
          "The answers will be provided in the format Answer\n - Question 1\n - Question 2\n - etc...",
          "Based on {name}'s answers, write only a short paragraph of around 100 words to summarize what I should consider when coaching them.",
          "Then write 2 lists of bullet points of their strengths and weaknesses.",
          "Use markdown to format your answer. And don't be too shy to use emojis!",
        ].join(" ")
      ),
      HumanMessagePromptTemplate.fromTemplate(
        "Yes:\n{yes}\nNo:\n{no}\nMaybe:\n{maybe}"
      ),
    ]);

    const taskChain = new LLMChain({ prompt, llm: chat });

    const { text } = await taskChain.call({
      name: clerkUser.firstName,
      yes: getQuestions("yes").map((q) => `- ${q.task.question}\n`),
      no: getQuestions("no").map((q) => `- ${q.task.question}\n`),
      maybe: getQuestions("maybe").map((q) => `- ${q.task.question}\n`),
    });

    await db
      .update(users)
      .set({ summary: text, summaryHash: hash })
      .where(eq(users.id, input));

    return text;
  }),
});
