import { AdapterAccount } from "@auth/core/adapters";
import { orgDb } from "@octocoach/db/connection";
import { DefaultSession } from "next-auth";

export type { DefaultSession, Session } from "next-auth";

export { mkAuth } from "./auth";

export interface OAuthProvider {
  displayName: string;
  required: boolean;
}

export type AvailableOAuthProviders =
  | "github"
  | "linkedin"
  | "discord"
  | "google";

export type OAuthProviders = Record<AvailableOAuthProviders, OAuthProvider>;

export type OAuthProvidersWithAccount = Record<
  AvailableOAuthProviders,
  OAuthProvider & AdapterAccount
>;

export const oauthProviders: OAuthProviders = {
  github: { displayName: "Github", required: true },
  linkedin: { displayName: "LinkedIn", required: true },
  discord: { displayName: "Discord", required: true },
  google: { displayName: "Google", required: false },
};

export const isCoach = async (userId: string, orgSlug: string) => {
  const db = orgDb(orgSlug);

  const coach = await db.query.coachTable.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  return !!coach;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User {
    id: string;
    isCoach?: boolean;
  }
}
