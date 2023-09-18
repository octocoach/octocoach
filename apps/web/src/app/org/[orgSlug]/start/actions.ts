"use server";

import mkAuthOptions from "@config/next-auth";
import { and, eq } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { Skill } from "@octocoach/db/src/schema/skills";
import {
  SkillLevel,
  usersSkillsLevels,
} from "@octocoach/db/src/schema/users-skills-levels";
import { usersTasksInterest } from "@octocoach/db/src/schema/users-tasks-interest";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

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
  const { user } = await getServerSession(mkAuthOptions(org?.value));

  if (!user) throw new Error("User not found");

  const interest: number = answer === "yes" ? 1 : answer === "no" ? -1 : 0;

  await db.insert(usersTasksInterest).values({
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
  const { user } = await getServerSession(mkAuthOptions(org?.value));
  if (!user) throw new Error("User not found");

  await db
    .insert(usersSkillsLevels)
    .values({
      skillId,
      userId: user.id,
      skillLevel,
    })
    .onConflictDoUpdate({
      target: [usersSkillsLevels.userId, usersSkillsLevels.skillId],
      set: { skillLevel },
      where: and(
        eq(usersSkillsLevels.userId, user.id),
        eq(usersSkillsLevels.skillId, skillId)
      ),
    });
};
