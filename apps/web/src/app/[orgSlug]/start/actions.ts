"use server";

import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { and, eq } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { Skill } from "@octocoach/db/src/schema/skills";
import { users } from "@octocoach/db/src/schema/users";
import {
  SkillLevel,
  usersSkillsLevels,
} from "@octocoach/db/src/schema/users-skills-levels";
import { usersTasksInterest } from "@octocoach/db/src/schema/users-tasks-interest";
import { getServerSession } from "next-auth";

export type Answer = "yes" | "no" | "dontknow";

export const submitAnswer = async ({
  answer,
  taskId,
}: {
  answer: Answer;
  taskId: number;
}) => {
  const { user } = await getServerSession(authOptions);
  if (!user) throw new Error("User not found");

  const userId = user.id;

  let dbUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (dbUser) {
    console.log(`${userId} : ${taskId} : ${answer}`);
  } else {
    console.log(`User ${userId} does not exist`);
    dbUser = (await db.insert(users).values({ id: userId }).returning())[0];
  }

  const interest: number = answer === "yes" ? 1 : answer === "no" ? -1 : 0;

  await db.insert(usersTasksInterest).values({
    taskId,
    userId,
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
  const { user } = await getServerSession();
  if (!user) throw new Error("User not found");

  const userId = user.id;
  let dbUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (dbUser) {
  } else {
    dbUser = (await db.insert(users).values({ id: userId }).returning())[0];
  }

  await db
    .insert(usersSkillsLevels)
    .values({
      skillId,
      userId,
      skillLevel,
    })
    .onConflictDoUpdate({
      target: [usersSkillsLevels.userId, usersSkillsLevels.skillId],
      set: { skillLevel },
      where: and(
        eq(usersSkillsLevels.userId, userId),
        eq(usersSkillsLevels.skillId, skillId)
      ),
    });
};
