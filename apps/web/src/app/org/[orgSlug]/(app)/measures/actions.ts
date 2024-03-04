"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { CreateMeetingParams } from "@octocoach/ui/Scheduler/types";
import { revalidatePath } from "next/cache";

export const createMeeting = async (
  orgSlug: string,
  { meeting, coachId }: CreateMeetingParams
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const { meetingTable, meetingParticipantTable } = mkOrgSchema(orgSlug);

  await db.transaction(async (trx) => {
    const meetingId = await trx
      .insert(meetingTable)
      .values(meeting)
      .returning()
      .then((rows) => rows[0].id);

    await trx.insert(meetingParticipantTable).values({
      user: user.id,
      meeting: meetingId,
      role: "coachee",
      accepted: true,
    });

    await trx.insert(meetingParticipantTable).values({
      user: coachId,
      meeting: meetingId,
      role: "coach",
    });
  });

  revalidatePath("/");
};
