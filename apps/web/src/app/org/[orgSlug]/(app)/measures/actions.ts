"use server";

import { authOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { eq } from "@octocoach/db/operators";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { CreateMeetingParams } from "@octocoach/ui/Scheduler/types";
import { format } from "date-fns";
import { convertToTimeZone } from "date-fns-timezone";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const formatMeetingDate = ({
  startTime,
  endTime,
}: {
  startTime: Date;
  endTime: Date;
}) => {
  const formatFrom = "PPPP HH:mm";
  const formatTo = "HH:mm";
  const timeZone = "Europe/Berlin";

  return `${format(
    convertToTimeZone(startTime, {
      timeZone,
    }),
    formatFrom
  )} - ${format(convertToTimeZone(endTime, { timeZone }), formatTo)}`;
};

export const createMeeting = async (
  orgSlug: string,
  { meeting, coachId }: CreateMeetingParams
) => {
  const { user } = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const { meetingTable, meetingParticipantTable, userTable } =
    mkOrgSchema(orgSlug);

  await db.transaction(async (trx) => {
    const meetingId = await trx
      .insert(meetingTable)
      .values(meeting)
      .returning()
      .then((rows) => rows[0]?.id ?? null);

    if (!meetingId) {
      console.error("Error adding meeting");
      await trx.rollback();
      return;
    }

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

  const coachEmail = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, coachId))
    .then((rows) => rows[0]?.email ?? null);

  const key = process.env.RESEND_KEY;

  if (key) {
    if (coachEmail) {
      const resend = new Resend(key);

      try {
        const { error } = await resend.emails.send({
          from: "OctoCoach <no-reply@notifications.octo.coach>",
          to: [coachEmail],
          subject: "New Meeting",
          text: `You have a new meeting.
          
          Type: ${meeting.type}
          User: ${user.name}
          At: ${formatMeetingDate(meeting)}`,
        });

        if (error) console.error(error);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Missing Coach Email");
    }
  } else {
    console.error("No RESEND_KEY");
  }

  revalidatePath("/");
};
