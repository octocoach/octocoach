"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { NewMeeting } from "@octocoach/db/schemas/org/meeting";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";

export type CreateMeetingParams = Pick<
  NewMeeting,
  "measure" | "type" | "startTime" | "endTime"
>;

export const createMeeting = async (
  orgSlug: string,
  params: CreateMeetingParams
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const { meetingTable } = mkOrgSchema(orgSlug);

  await db.insert(meetingTable).values({ ...params, coachee: user.id });
};
