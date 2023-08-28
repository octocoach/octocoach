import type { AppRouter } from "@octocoach/trpc/src/server/routers/app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3002",
    }),
  ],
  transformer: superjson,
});
