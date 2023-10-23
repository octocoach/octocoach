import { db } from "@octocoach/db/connection";

export type { Adapter, AdapterAccount } from "@auth/core/adapters";
export { authDrizzleAdapter } from "./drizzle";

export const getUserAccounts = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  return await db.query.accountTable.findMany({
    where: (account, { eq }) => eq(account.userId, userId),
  });
};
