import { orgDb } from "@octocoach/db/connection";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

export default NextAuth;
export { getServerSession } from "next-auth";
export type { DefaultSession, DefaultUser, Session } from "next-auth";

interface OAuthProvider {
  displayName: string;
  required: boolean;
}

type AvailableOAuthProviders = "github" | "linkedin" | "discord";

export const oauthProviders: Record<AvailableOAuthProviders, OAuthProvider> = {
  github: { displayName: "Github", required: true },
  linkedin: { displayName: "LinkedIn", required: true },
  discord: { displayName: "Discord", required: true },
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

  interface User extends DefaultUser {
    id: string;
    isCoach?: boolean;
  }
}
