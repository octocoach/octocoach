import { orgDb } from "@octocoach/db/connection";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";
import { ofetch } from "ofetch";
import { AvailableOAuthProviders } from "..";

export interface RefreshTokenParams {
  userId: User["id"];
  orgSlug: Organization["slug"];
}

export interface GoogleRefreshTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
  id_token: string;
}

export const refreshGoogleToken = async ({
  userId,
  orgSlug,
}: RefreshTokenParams) => {
  "use server";

  const clientId = process.env.GOOGLE_ID;
  const clientSecret = process.env.GOOGLE_SECRET;

  if (!clientId || !clientSecret)
    throw new Error("Missing Google client id or client secret");

  const db = orgDb(orgSlug);

  const { accountTable } = mkOrgSchema(orgSlug);

  const refreshToken = await db
    .select({
      refreshToken: accountTable.refresh_token,
    })
    .from(accountTable)
    .where(
      and(eq(accountTable.userId, userId), eq(accountTable.provider, "google"))
    )
    .then((rows) => rows[0]?.refreshToken ?? null);

  if (!refreshToken)
    throw new Error(`User ${userId} is missing a refresh token`);

  const now = Math.ceil(Date.now() / 1000);
  const { expires_in, ...result } = await ofetch<GoogleRefreshTokenResponse>(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      body: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      },
      retry: 3,
      retryDelay: 500,
    }
  );

  const expires_at = now + expires_in;

  const account = await db
    .update(accountTable)
    .set({
      ...result,
      expires_at,
    })
    .where(
      and(eq(accountTable.userId, userId), eq(accountTable.provider, "google"))
    )
    .returning()
    .then((rows) => rows[0]);

  return account;
};

export const getAccessToken = async ({
  userId,
  orgSlug,
  provider,
}: {
  userId: User["id"];
  orgSlug: Organization["slug"];
  provider: AvailableOAuthProviders;
}) => {
  "use server";

  const db = orgDb(orgSlug);
  const { accountTable } = mkOrgSchema(orgSlug);

  const { accessToken, expiresAt } = await db
    .select({
      accessToken: accountTable.access_token,
      expiresAt: accountTable.expires_at,
    })
    .from(accountTable)
    .where(
      and(eq(accountTable.userId, userId), eq(accountTable.provider, provider))
    )
    .then((rows) => rows[0] ?? null);

  if (!accessToken) throw new Error(`Missing access_token for user ${userId}`);

  if (expiresAt === null || Date.now() <= expiresAt * 1000) {
    return accessToken;
  }

  if (provider === "google") {
    const account = await refreshGoogleToken({ userId, orgSlug });
    if (!account.access_token)
      throw new Error(`Empty access_token after refresh. User: ${userId}`);
    return account.access_token;
  }
  throw new Error(`Could not get access_token for user ${userId}`);
};
