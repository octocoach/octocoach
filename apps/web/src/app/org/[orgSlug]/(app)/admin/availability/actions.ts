"use server";

import { authOrRedirect } from "@helpers/auth";
import { getAccessToken } from "@octocoach/auth/helpers/oauth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Coach } from "@octocoach/db/schemas/types";
import { revalidatePath } from "next/cache";

export interface GoogleCalendar {
  id: string;
  summary: string;
  primary?: boolean;
}

export const getGoogleCalendars = async (params: {
  userId: string;
  orgSlug: Organization["slug"];
}) => {
  const accessToken = await getAccessToken({ ...params, provider: "google" });
  const headers = { Authorization: `Bearer ${accessToken}` };

  const calendarListRes = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    { headers }
  );

  if (!calendarListRes.ok) {
    throw new Error(calendarListRes.statusText);
  }

  const calendarList = await calendarListRes.json();

  return (calendarList?.items || []) as GoogleCalendar[];
};

export type SaveCoachPreferencesValues = Omit<Coach, "userId">;

export const saveCoachPreferences = async (
  orgSlug: Organization["slug"],
  values: SaveCoachPreferencesValues
) => {
  const { user } = await authOrRedirect(orgSlug);
  if (!user.isCoach)
    throw new Error("This option is only available to coaches");

  const db = orgDb(orgSlug);

  const { coachTable } = mkOrgSchema(orgSlug);

  await db.update(coachTable).set(values).where(eq(coachTable.userId, user.id));

  revalidatePath("/org/[orgSlug]/(app)/admin/availability", "page");
};
