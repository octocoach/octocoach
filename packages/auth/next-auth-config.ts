import { db, orgDb } from "@octocoach/db/connection";
import { type NextAuthOptions } from "next-auth";
import { authDrizzleAdapter } from "./adapters/drizzle";

import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { Adapter } from "./adapters";

// TODO: The Adapter type in `@auth/core` and `next-auth` are different.
type FixedAdapter = Omit<NextAuthOptions, "adapter"> & { adapter: Adapter };

const mkProviders = (linkAccounts: boolean) => {
  const providers = [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
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

export default function mkAuthOptions(
  org?: string,
  signInPage?: boolean
): FixedAdapter {
  const adapterDb = org ? orgDb(org) : db;
  console.log(org ? `Using org ${org} db` : "Using default db");
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
    providers: mkProviders(!signInPage),
  };
}
