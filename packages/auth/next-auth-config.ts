import { db, orgDb } from "@octocoach/db/connection";
import { type NextAuthOptions } from "next-auth";
import { authDrizzleAdapter } from "./adapters/drizzle";

import { Organization } from "@octocoach/db/schemas/common/organization";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { Adapter } from "./adapters";
import { decrypt } from "./helpers";

// TODO: The Adapter type in `@auth/core` and `next-auth` are different.
type FixedAdapter = Omit<NextAuthOptions, "adapter"> & { adapter: Adapter };

const getGithubCredentials = (
  organization?: Organization
): { clientId: string; clientSecret: string } => {
  if (
    process.env.NODE_ENV === "production" &&
    organization?.githubId &&
    organization?.githubSecret
  ) {
    console.log("Using organization github credentials");
    return {
      clientId: organization.githubId,
      clientSecret: decrypt(organization.githubSecret),
    };
  }

  if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET)
    throw new Error("Missing GITHUB_ID or GITHUB_SECRET");

  console.log("Using default github credentials");
  return {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  };
};

const mkProviders = (linkAccounts: boolean, organization?: Organization) => {
  const { clientId, clientSecret } = getGithubCredentials(organization);
  const providers = [
    GitHubProvider({
      clientId,
      clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  ];

  if (!linkAccounts) return providers;

  return [
    ...providers,
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID ?? "",
      clientSecret: process.env.LINKEDIN_SECRET ?? "",
      authorization: { params: { scope: "profile email openid" } },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      idToken: true,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
  ];
};

export default async function mkAuthOptions(
  org?: string,
  signInPage?: boolean
): Promise<FixedAdapter> {
  const adapterDb = org ? orgDb(org) : db;
  console.log(org ? `Using org ${org} db` : "Using default db");

  const organization = org
    ? await db.query.organizationTable.findFirst({
        where: (table, { eq }) => eq(table.slug, org),
      })
    : undefined;

  return {
    adapter: authDrizzleAdapter(adapterDb, org),
    callbacks: {
      // See: https://github.com/rexfordessilfie/next-auth-account-linking/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts
      async signIn(params) {
        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user: { ...session.user, id: user.id },
        };
      },
    },
    providers: mkProviders(!signInPage, organization),
  };
}
