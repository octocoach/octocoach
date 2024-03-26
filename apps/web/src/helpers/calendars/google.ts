import { getAccessToken } from "@octocoach/auth/helpers/oauth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { Organization } from "@octocoach/db/schemas/common/organization";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { getEntries } from "@octocoach/tshelpers";
import { Interval } from "date-fns";

export interface FreeBusyEntry {
  start: string;
  end: string;
}

export interface FreeBusyResponse {
  calendars: Record<string, { busy: FreeBusyEntry[] }>;
}

export const getFreeBusy = async ({
  userId,
  orgSlug,
  start,
  end,
}: {
  userId: string;
  orgSlug: Organization["slug"];
  start: Date;
  end: Date;
}): Promise<Interval[]> => {
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

  if (!coach.externalCalendars) return [];

  const calendarIds = getEntries(coach.externalCalendars.google).flatMap(
    ([_, ids]) => ids
  );

  const headers = { Authorization: `Bearer ${accessToken}` };

  const requestBody = {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    items: calendarIds.map((id) => ({ id })),
  };

  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  if (res.ok) {
    const result: FreeBusyResponse = await res.json();

    const busyEntries = getEntries(result.calendars).flatMap(([_, { busy }]) =>
      busy.map(({ start, end }) => ({
        start: new Date(start),
        end: new Date(end),
      }))
    );

    return busyEntries;
  } else {
    throw new Error(res.statusText);
  }
};
