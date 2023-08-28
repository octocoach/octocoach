import { createAgent } from "@octocoach/embeddings";

import { z } from "zod";
import { publicProcedure, router } from "../../server/trpc";
import { userRouter } from "./user";

export const appRouter = router({
  hello: publicProcedure
    .input(z.string())
    .query(async ({ input }) => `Hi ${input}`),
  askAZAV: publicProcedure.input(z.string()).query(async ({ input }) => {
    const agent = await createAgent({
      indexPath: "../../packages/embeddings/vectors/ba-metasearch-index",
    });

    const result = await agent.call({ input });
    return result.output;
  }),
  ping: publicProcedure.query(() => "pong"),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
