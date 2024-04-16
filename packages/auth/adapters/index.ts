import type { AdapterAccount } from "@auth/core/adapters";
import { orgDb } from "@octocoach/db/connection";
import { fromEntries, getEntries } from "@octocoach/tshelpers";
export type { Adapter, AdapterAccount } from "@auth/core/adapters";
export { authDrizzleAdapter } from "./drizzle";
export type OAuthProviders = Record<
  AvailableOAuthProviders,
  OAuthProvider & AdapterAccount
>;

import { AvailableOAuthProviders, OAuthProvider, oauthProviders } from "..";

export const getUserAccounts = async (userId: string, orgSlug?: string) => {
  const db = orgSlug
    ? orgDb(orgSlug)
    : await import("@octocoach/db/connection").then(({ db }) => db);

  const dbAccounts = await db.query.accountTable.findMany({
    where: (account, { eq }) => eq(account.userId, userId),
  });

  return fromEntries(
    getEntries(oauthProviders).map(([provider, { displayName, required }]) => {
      const dbAccount = dbAccounts.find(
        (account) => account.provider === provider
      );
      return [provider, { displayName, required, dbAccount }];
    })
  );
};
