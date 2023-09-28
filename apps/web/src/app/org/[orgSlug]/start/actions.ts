"use server";

import mkAuthOptions from "@config/next-auth";
import { and, eq } from "@octocoach/db/operators";
import { orgDb } from "@octocoach/db/connection";
import type { Skill } from "@octocoach/db/schemas/common/skill";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import { SkillLevel } from "@octocoach/db/schemas/common/skill-level";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";

export type Answer = "yes" | "no" | "dontknow";

export const submitAnswer = async ({
  answer,
  taskId,
}: {
  answer: Answer;
  taskId: number;
}) => {
  const c = cookies();
  const org = c.get("org");
  if (!org?.value) throw new Error("Org not found");

  const { user } = await getServerSession(mkAuthOptions(org?.value));
  if (!user) throw new Error("User not found");

  const db = orgDb(org.value);

  const usersTaskInterestTable = mkUsersTaskInterestTable(org.value);

  const interest: number = answer === "yes" ? 1 : answer === "no" ? -1 : 0;

  await db.insert(usersTaskInterestTable).values({
    taskId,
    userId: user.id,
    interest,
  });
};

export const submitSkillAssessment = async ({
  skillId,
  skillLevel,
}: {
  skillId: Skill["id"];
  skillLevel: SkillLevel;
}) => {
  const org = cookies().get("org");
  if (!org?.value) throw new Error("Org not found");

  const { user } = await getServerSession(mkAuthOptions(org.value));
  if (!user) throw new Error("User not found");

  const db = orgDb(org.value);

  const usersSkillLevels = mkUsersSkillLevelsTable(org.value);

  await db
    .insert(usersSkillLevels)
    .values({
      skillId,
      userId: user.id,
      skillLevel,
    })
    .onConflictDoUpdate({
      target: [usersSkillLevels.userId, usersSkillLevels.skillId],
      set: { skillLevel },
      where: and(
        eq(usersSkillLevels.userId, user.id),
        eq(usersSkillLevels.skillId, skillId)
      ),
    });
};
