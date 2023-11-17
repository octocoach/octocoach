import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

const t = initTRPC.context<Context>().create({ transformer: superjson });

const isOrgCoach = t.middleware((opts) => {
  const { ctx } = opts;

  if (!ctx.session?.user?.isCoach) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return opts.next(opts);
});

export const {
  router,
  procedure: publicProcedure,
  middleware,
  mergeRouters,
} = t;
export const protectedProcedureCoach = t.procedure.use(isOrgCoach);
