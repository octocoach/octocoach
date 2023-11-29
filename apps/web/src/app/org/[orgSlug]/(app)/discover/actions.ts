"use server";

import { getServerSession } from "@octocoach/auth";
import mkAuthOptions from "@octocoach/auth/next-auth-config";
import { orgDb } from "@octocoach/db/connection";
import { Skill } from "@octocoach/db/schemas/common/skill";
import { SkillLevel } from "@octocoach/db/schemas/common/skill-level";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import { revalidatePath } from "next/cache";

export type Answer = "yes" | "no" | "dontknow";
export interface SkillAssessment {
  id: Skill["id"];
  level: SkillLevel;
}
export interface AddUserTaskInterest {
  answer: Answer;
  taskId: number;
  skillAssessments: SkillAssessment[];
}

export const addUserTaskInterest = async (
  orgSlug: string,
  { answer, taskId, skillAssessments }: AddUserTaskInterest
) => {
  const { user } = await getServerSession(await mkAuthOptions(orgSlug));
  if (!user) throw new Error("User not found");

  const db = orgDb(orgSlug);

  const usersTaskInterestTable = mkUsersTaskInterestTable(orgSlug);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(orgSlug);

  const interest: number = answer === "yes" ? 1 : answer === "no" ? -1 : 0;

  await db.insert(usersTaskInterestTable).values({
    taskId,
    userId: user.id,
    interest,
  });

  revalidatePath(`/org/${orgSlug}/(app)/discover`, "page");
};
