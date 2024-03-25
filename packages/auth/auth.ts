import { db, orgDb } from "@octocoach/db/connection";
import { Organization } from "@octocoach/db/schemas/common/organization";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
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

const mkProviders = async ({
  organization,
  linkAccounts,
}: {
  organization?: Organization;
  linkAccounts: boolean;
}) => {
  const { clientId, clientSecret } = await getGithubCredentials(organization);

  const providers = [
    GitHub({ clientId, clientSecret, allowDangerousEmailAccountLinking: true }),
  ];

  if (!linkAccounts) return providers;

  return [
    ...providers,
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/calendar.events.readonly",
            "https://www.googleapis.com/auth/calendar",
          ].join(" "),
        },
      },
    }),
  ];
};

export const mkAuth = async (orgSlug?: string, isSignInPage?: boolean) => {
  const adapterDb = orgSlug ? orgDb(orgSlug) : db;

  const organization = orgSlug
    ? await db.query.organizationTable.findFirst({
        where: (table, { eq }) => eq(table.slug, orgSlug),
      })
    : undefined;

  const providers = await mkProviders({
    organization,
    linkAccounts: !isSignInPage,
  });

  return NextAuth({
    adapter: authDrizzleAdapter(adapterDb, orgSlug),
    providers,
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
