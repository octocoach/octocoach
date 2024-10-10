import { CookieBanner } from "@components/cookie-banner";
import { mkAuth } from "@octocoach/auth";
import { SessionProvider } from "@octocoach/auth/react";
import { db } from "@octocoach/db/connection";
import { Toast } from "@octocoach/ui";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { acceptCookiesAction } from "./actions";
import type { Params } from "./types";

export async function generateMetadata({
  params: { orgSlug },
}: Params): Promise<Metadata> {
  const organization = await db.query.organizationTable.findFirst({
    where: (table, { eq }) => eq(table.slug, orgSlug),
  });

  if (!organization) {
    return {
      title: "OctoCoach",
    };
  }

  return {
    title: {
      default: organization.displayName,
      template: `%s | ${organization.displayName}`,
    },
  };
}

export default async function Layout({
  children,
  params,
}: Params & {
  children: ReactNode;
}) {
  const organization = await db.query.organizationTable.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, params.orgSlug),
    with: {
      address: true,
      owner: true,
    },
  });

  if (!organization) {
    notFound();
  }

  const { auth } = await mkAuth(params.orgSlug);

  const session = await auth();

  const allowCookies = cookies().get("allow_cookies")?.value === "true";

  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>;
      <Toast />
      {!allowCookies && (
        <CookieBanner acceptCookiesAction={acceptCookiesAction} />
      )}
    </>
  );
}

export const runtime = "edge";
export const preferredRegion = ["fra1"];
