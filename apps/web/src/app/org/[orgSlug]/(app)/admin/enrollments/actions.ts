"use server";

import { authOrRedirect } from "@helpers/auth";
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
  const { user } = await authOrRedirect(orgSlug);
  const daily = new Daily();
  const nameSlice = customAlphabet(lowercase, 3);
  const roomName = `${nameSlice()}-${nameSlice()}-${nameSlice()}`;
  const db = orgDb(orgSlug);
  const { enrollmentTable, measureTable } = mkOrgSchema(orgSlug);

  const measure = await db
    .select()
    .from(measureTable)
    .where(eq(measureTable.id, enrollment.measure))
    .then((rows) => rows[0] ?? null);

  if (!measure) {
    throw new Error("Measure not found");
  }

  if (user.id !== measure.owner) {
    throw new Error("User is not the owner of the measure");
  }

  const room = await daily.createRoom({ privacy: "private", name: roomName });

  await db
    .update(enrollmentTable)
    .set({ roomName: room.name, coach: user.id })
    .where(
      and(
        eq(enrollmentTable.measure, enrollment.measure),
        eq(enrollmentTable.coachee, enrollment.coachee)
      )
    );

  return room;
};
