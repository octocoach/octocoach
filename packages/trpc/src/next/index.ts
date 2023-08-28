import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "../server/routers/app";

export const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
