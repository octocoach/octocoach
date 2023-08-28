import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({ transformer: superjson });

export const {
  router,
  procedure: publicProcedure,
  middleware,
  mergeRouters,
} = t;
