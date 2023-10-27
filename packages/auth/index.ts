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

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
  }
}
