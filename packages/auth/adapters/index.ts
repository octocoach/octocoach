import { orgDb } from "@octocoach/db/connection";

export type { Adapter, AdapterAccount } from "@auth/core/adapters";
export { authDrizzleAdapter } from "./drizzle";

import { oauthProviders } from "..";

export const getUserAccounts = async (userId: string, orgSlug?: string) => {
  const db = orgSlug
    ? orgDb(orgSlug)
    : await import("@octocoach/db/connection").then(({ db }) => db);

  const dbAccounts = await db.query.accountTable.findMany({
    where: (account, { eq }) => eq(account.userId, userId),
  });

  return Object.fromEntries(
    Object.entries(oauthProviders).map(
      ([provider, { displayName, required }]) => {
        const dbAccount = dbAccounts.find(
          (account) => account.provider === provider
        );
        return [provider, { displayName, required, dbAccount }];
      }
    )
  );
};
