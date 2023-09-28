import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db, orgDb } from "@octocoach/db/connection";
import { authDrizzleAdapter } from "@octocoach/auth-drizzle-adapter";

export default function mkAuthOptions(org?: string): NextAuthOptions {
  const adapterDb = org ? orgDb(org) : db;
  console.log(org ? `Using org ${org} db` : "Using default db");
  return {
    adapter: authDrizzleAdapter(adapterDb),
    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user: { ...session.user, id: user.id },
        };
      },
    },
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  };
}
