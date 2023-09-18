import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, orgDb } from "@octocoach/db/src/connection";

export default function mkAuthOptions(org?: string): NextAuthOptions {
  const adapterDb = org ? orgDb(org) : db;
  console.log(org ? `Using org ${org} db` : "Using default db");
  return {
    adapter: DrizzleAdapter(adapterDb),
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
