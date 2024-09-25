"use server";

import { authOrRedirect } from "@helpers/auth";
import { sendFacebookConversionEvent } from "@helpers/facebook";
import { orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { mkUserProfileTable } from "@octocoach/db/schemas/org/user-profile";
import { NewUserProfile } from "@octocoach/db/schemas/types";

export type ProfileForm = Required<
  Pick<
    NewUserProfile,
    | "firstName"
    | "lastName"
    | "city"
    | "termsAccepted"
    | "emailCommunicationAccepted"
  >
>;

type BoundValues = {
  userId: string;
  orgSlug: string;
  origin?: string;
};

export async function saveProfile(
  { userId, orgSlug, origin }: BoundValues,
  userProfile: ProfileForm
) {
  const { user } = await authOrRedirect(orgSlug);

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

  if (user.email) {
    await sendFacebookConversionEvent({
      eventName: "CompleteRegistration",
      user: {
        email: user.email,
        ...userProfile,
      },
    });
  }

  orgRedirect(origin ? `${origin}` : "start");
}
