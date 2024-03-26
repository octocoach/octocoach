"use server";

import { authOrRedirect } from "@helpers/auth";
import { getAccessToken } from "@octocoach/auth/helpers/oauth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Coach } from "@octocoach/db/schemas/types";
import { revalidatePath } from "next/cache";
import { ofetch } from "ofetch";

export interface GoogleCalendar {
  id: string;
  summary: string;
  primary?: boolean;
}

interface GoogleCalendarListResponse {
  items: GoogleCalendar[];
}

export const getGoogleCalendars = async (params: {
  userId: string;
  orgSlug: Organization["slug"];
}) => {
  const accessToken = await getAccessToken({ ...params, provider: "google" });

  const { items } = await ofetch<GoogleCalendarListResponse>(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      retry: 3,
      retryDelay: 500,
    }
  );

  return items;
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
