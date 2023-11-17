"use server";

import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { mkUserProfileTable } from "@octocoach/db/schemas/org/user-profile";
import { NewUserProfile } from "@octocoach/db/schemas/types";
import { revalidatePath } from "next/cache";

export type ProfileForm = Pick<
  NewUserProfile,
  "firstName" | "lastName" | "termsAccepted" | "emailCommunicationAccepted"
>;

type BoundValues = {
  userId: string;
  orgSlug: string;
};

export async function saveProfile(
  { userId, orgSlug }: BoundValues,
  userProfile: ProfileForm
) {
  const db = orgDb(orgSlug);

  const userProfileTable = mkUserProfileTable(orgSlug);

  const values: NewUserProfile = {
    userId,
    ...userProfile,
  };

  await db
    .insert(userProfileTable)
    .values(values)
    .onConflictDoUpdate({
      target: userProfileTable.userId,
      set: values,
      where: eq(userProfileTable.userId, userId),
    });

  revalidatePath(`/org/${orgSlug}/signup`);
}
