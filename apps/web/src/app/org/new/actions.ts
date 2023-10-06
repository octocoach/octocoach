"use server";

import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { db } from "@octocoach/db/connection";

import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import createOrg from "@octocoach/db/actions/create-org";

export async function create({ name, slug }: { name: string; slug: string }) {
  const { user } = await getServerSession(mkAuthOptions());

  if (!user) redirect("/");

  if (!name) throw Error("Missing name");
  if (!slug) throw Error("Missing slug");

  await db.insert(organizationTable).values({
    name,
    slug,
    owner: user.id,
  });

  await createOrg(slug);

  redirect(`/org/${slug}`);
}
