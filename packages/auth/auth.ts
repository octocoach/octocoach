import { db, orgDb } from "@octocoach/db/connection";
import { Organization } from "@octocoach/db/schemas/common/organization";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { isCoach as isCoachFn } from ".";
import { authDrizzleAdapter } from "./adapters";
import { decrypt } from "./helpers/crypto";

const getGithubCredentials = async (
  organization?: Organization
): Promise<{ clientId: string; clientSecret: string }> => {
  if (
    process.env.VERCEL_ENV === "production" &&
    organization?.githubId &&
    organization?.githubSecret
  ) {
    const clientSecret = await decrypt(organization.githubSecret);

    return {
      clientId: organization.githubId,
      clientSecret,
    };
  }

  if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET)
    throw new Error("Missing GITHUB_ID or GITHUB_SECRET");

  return {
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  };
};

export const mkAuth = async (orgSlug?: string, isSignInPage?: boolean) => {
  const adapterDb = orgSlug ? orgDb(orgSlug) : db;

  const organization = orgSlug
    ? await db.query.organizationTable.findFirst({
        where: (table, { eq }) => eq(table.slug, orgSlug),
      })
    : undefined;

  return NextAuth({
    adapter: authDrizzleAdapter(adapterDb, orgSlug),
    providers: [
      GitHub({
        ...(await getGithubCredentials(organization)),
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        const isCoach = !!orgSlug && (await isCoachFn(user.id, orgSlug));
        return {
          ...session,
          user: { ...session.user, id: user.id, isCoach },
        };
      },
    },
  });
};
