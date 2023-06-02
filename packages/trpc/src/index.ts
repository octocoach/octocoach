import { createAgent } from "@octocoach/embeddings";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const { router, procedure } = t;

export const appRouter = router({
  hello: procedure.input(z.string()).query(async ({ input }) => `Hi ${input}`),
  askAZAV: procedure.input(z.string()).query(async ({ input }) => {
    const agent = await createAgent({
      indexPath: "../../packages/embeddings/vectors/ba-metasearch-index",
    });

    const result = await agent.call({ input });
    return result.output;
  }),
  ping: procedure.query(() => "pong"),
});

export type AppRouter = typeof appRouter;
