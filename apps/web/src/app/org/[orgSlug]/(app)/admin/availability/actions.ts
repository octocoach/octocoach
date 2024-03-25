"use server";

import { authOrRedirect } from "@helpers/auth";
import { getAccessToken } from "@octocoach/auth/helpers/oauth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { Coach } from "@octocoach/db/schemas/types";
import { getEntries } from "@octocoach/tshelpers";
import { addDays } from "date-fns";
import { revalidatePath } from "next/cache";

export interface GoogleCalendar {
  id: string;
  summary: string;
  primary?: boolean;
}

export interface FreeBusyEntry {
  start: string;
  end: string;
}

export interface FreeBusyResponse {
  calendars: Record<GoogleCalendar["id"], { busy: FreeBusyEntry[] }>;
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

export const getFreeBusy = async ({
  userId,
  orgSlug,
}: {
  userId: string;
  orgSlug: Organization["slug"];
}) => {
  const accessToken = await getAccessToken({
    userId,
    orgSlug,
    provider: "google",
  });

  const db = orgDb(orgSlug);

  const { coachTable } = mkOrgSchema(orgSlug);

  const coach = await db
    .select()
    .from(coachTable)
    .where(eq(coachTable.userId, userId))
    .then((rows) => rows[0] ?? null);

  if (!coach) throw new Error(`Coach ${userId} not found`);

  if (!coach.externalCalendars) return;

  const calendarIds = getEntries(coach.externalCalendars.google).flatMap(
    ([_, ids]) => ids
  );

  const headers = { Authorization: `Bearer ${accessToken}` };

  const date = new Date();
  const requestBody = {
    timeMin: date.toISOString(),
    timeMax: addDays(date, 7).toISOString(),
    timeZone: "Europe/Berlin",
    items: calendarIds.map((id) => ({ id })),
  };

  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  if (res.ok) {
    const result: FreeBusyResponse = await res.json();

    const calendars = getEntries(result.calendars);

    for (const [id, { busy }] of calendars) {
      console.log(id);
      for (const b of busy) {
        console.log(b.start);
      }
    }
  } else {
    console.error(res.statusText);
  }
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
