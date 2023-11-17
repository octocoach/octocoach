import { orgDb } from "@octocoach/db/connection";
import { mkUserProfileTable } from "@octocoach/db/schemas/org/user-profile";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { createHash } from "node:crypto";
import { z } from "zod";
import { protectedProcedureCoach, router } from "../trpc";

export const userRouter = router({
  summary: protectedProcedureCoach
    .input(z.object({ userId: z.string(), orgSlug: z.string() }))
    .query(async ({ input }) => {
      const chat = new ChatOpenAI({ temperature: 0.7, modelName: "gpt-4" });

      const db = orgDb(input.orgSlug);

      const userProfileTable = mkUserProfileTable(input.orgSlug);

      const user = await db.query.userTable.findFirst({
        with: {
          userProfile: true,
          usersTaskInterest: {
            with: { task: true },
          },
        },
        where: (users, { eq }) => eq(users.id, input.userId),
      });

      const hash = createHash("sha256")
        .update(JSON.stringify(user?.usersTaskInterest ?? []))
        .digest("hex");

      if (user?.userProfile?.summaryHash === hash) {
        console.log("Summary cache hit!");
        return user.userProfile.summary;
      }

      const getQuestions = (answer: "yes" | "no" | "maybe") => {
        const i = answer === "yes" ? 1 : answer === "no" ? -1 : 0;
        if (!user) throw Error("No User!");
        return user.usersTaskInterest.filter((d) => d.interest === i);
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
        name: user?.name ?? "Unknown",
        yes: getQuestions("yes").map((q) => `- ${q.task.question}\n`),
        no: getQuestions("no").map((q) => `- ${q.task.question}\n`),
        maybe: getQuestions("maybe").map((q) => `- ${q.task.question}\n`),
      });

      await db
        .insert(userProfileTable)
        .values({
          userId: input.userId,
          summary: text,
          summaryHash: hash,
        })
        .onConflictDoUpdate({
          target: userProfileTable.userId,
          set: { summary: text, summaryHash: hash },
        });

      return text;
    }),
});
