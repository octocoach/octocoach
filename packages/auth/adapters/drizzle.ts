import { Adapter } from "@auth/core/adapters";
import { Database, OrgDatabase } from "@octocoach/db/connection";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { publicSchema } from "@octocoach/db/schemas/public/schema";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export function authDrizzleAdapter(
  db: Database | OrgDatabase,
  org?: string
): Adapter {
  const { userTable, accountTable, sessionTable, verificationTokenTable } = org
    ? mkOrgSchema(org)
    : publicSchema;

  return {
    async createUser(user) {
      return await db
        .insert(userTable)
        .values({ ...user, id: nanoid() })
        .returning()
        .then((rows) => rows[0]);
    },
    async getUser(id) {
      return await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, id))
        .then((rows) => rows[0] ?? null);
    },
    async getUserByEmail(email) {
      return await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email))
        .then((rows) => rows[0] ?? null);
    },
    async createSession(session) {
      return await db
        .insert(sessionTable)
        .values(session)
        .returning()
        .then((rows) => rows[0]);
    },
    async getSessionAndUser(sessionToken) {
      return await db
        .select({ session: sessionTable, user: userTable })
        .from(sessionTable)
        .where(eq(sessionTable.sessionToken, sessionToken))
        .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
        .then((rows) => rows[0] ?? null);
    },
    async updateUser(user) {
      if (!user.id) {
        throw new Error("User id is required");
      }
      return await db
        .update(userTable)
        .set(user)
        .where(eq(userTable.id, user.id))
        .returning()
        .then((rows) => rows[0]);
    },
    async updateSession(session) {
      return await db
        .update(sessionTable)
        .set(session)
        .where(eq(sessionTable.sessionToken, session.sessionToken))
        .returning()
        .then((rows) => rows[0] ?? null);
    },
    async linkAccount(account) {
      const updatedAccount = await db
        .insert(accountTable)
        .values(account)
        .returning()
        .then((rows) => rows[0]);

      return {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      };
    },
    async getUserByAccount(account) {
      return await db
        .select({ user: userTable })
        .from(accountTable)
        .where(
          and(
            eq(accountTable.provider, account.provider),
            eq(accountTable.providerAccountId, account.providerAccountId)
          )
        )
        .leftJoin(userTable, eq(userTable.id, accountTable.userId))
        .then((rows) => rows[0])
        .then((row) => row?.user ?? null);
    },
    async deleteSession(sessionToken) {
      const deletedSession = await db
        .delete(sessionTable)
        .where(eq(sessionTable.sessionToken, sessionToken))
        .returning()
        .then((rows) => rows[0] ?? null);

      return deletedSession;
    },
    async createVerificationToken(verificationToken) {
      return await db
        .insert(verificationTokenTable)
        .values(verificationToken)
        .returning()
        .then((rows) => rows[0]);
    },
    async useVerificationToken(params) {
      try {
        return await db
          .delete(verificationTokenTable)
          .where(
            and(
              eq(verificationTokenTable.token, params.token),
              eq(verificationTokenTable.identifier, params.identifier)
            )
          )
          .returning()
          .then((rows) => rows[0] ?? null);
      } catch (error) {
        throw new Error("Verification token not found");
      }
    },
    async unlinkAccount(account) {
      const deletedAccount = await db
        .delete(accountTable)
        .where(
          and(
            eq(accountTable.provider, account.provider),
            eq(accountTable.providerAccountId, account.providerAccountId)
          )
        )
        .returning({
          provider: accountTable.provider,
          type: accountTable.type,
          providerAccountId: accountTable.providerAccountId,
          userId: accountTable.userId,
        })
        .then((rows) => rows[0] ?? null);

      return deletedAccount;
    },
  };
}
