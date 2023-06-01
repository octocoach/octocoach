import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const { router, procedure } = t;

export const appRouter = router({
  hello: procedure.input(z.string()).query(async ({ input }) => `Hi ${input}`),
});

export type AppRouter = typeof appRouter;
