import { z } from "zod";
import { publicProcedure, router } from "../../server/trpc";
import { userRouter } from "./user";

export const appRouter = router({
  hello: publicProcedure
    .input(z.string())
    .query(async ({ input }) => `Hi ${input}`),

  ping: publicProcedure.query(() => "pong"),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
