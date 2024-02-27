"use server";

import { Daily } from "@octocoach/daily";
import { orgDb } from "@octocoach/db/connection";
import { and, eq } from "@octocoach/db/operators";
import { Enrollment } from "@octocoach/db/schemas/org/enrollment";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";

export const createRoom = async (
  orgSlug: string,
  enrollment: Pick<Enrollment, "measure" | "coachee">
) => {
  const daily = new Daily();
  const nameSlice = customAlphabet(lowercase, 3);
  const roomName = `${nameSlice()}-${nameSlice()}-${nameSlice()}`;
  const db = orgDb(orgSlug);
  const { enrollmentTable } = mkOrgSchema(orgSlug);

  const room = await daily.createRoom({ privacy: "private", name: roomName });

  await db
    .update(enrollmentTable)
    .set({ roomName: room.name })
    .where(
      and(
        eq(enrollmentTable.measure, enrollment.measure),
        eq(enrollmentTable.coachee, enrollment.coachee)
      )
    );

  return room;
};
