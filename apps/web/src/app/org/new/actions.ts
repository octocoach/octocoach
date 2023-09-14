"use server";

import authOptions from "@config/next-auth";
import { db } from "@octocoach/db/src/connection";
import { organizations } from "@octocoach/db/src/schema/organizations";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import createOrg from "@octocoach/db/src/org/create-org";

export async function create({ name, slug }: { name: string; slug: string }) {
  const { user } = await getServerSession(authOptions);

  if (!user) redirect("/");

  if (!name) throw Error("Missing name");
  if (!slug) throw Error("Missing slug");

  await db.insert(organizations).values({
    name,
    slug,
    owner: user.id,
  });

  await createOrg(slug);

  redirect(`/org/${slug}`);
}
