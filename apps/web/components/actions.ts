"use server";

import { auth } from "@clerk/nextjs";
import { and, eq } from "@octocoach/db/src";
import { db } from "@octocoach/db/src/connection";
import { Skill } from "@octocoach/db/src/schema/skills";
import { users } from "@octocoach/db/src/schema/users";
import { usersSkillsLevels } from "@octocoach/db/src/schema/users-skills-levels";
import { usersTasksInterest } from "@octocoach/db/src/schema/users-tasks-interest";

export type Answer = "yes" | "no" | "dontknow";

export const submitAnswer = async ({
  answer,
  taskId,
}: {
  answer: Answer;
  taskId: number;
}) => {
  const { userId } = auth();

  let user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (user) {
    console.log(`${userId} : ${taskId} : ${answer}`);
  } else {
    console.log(`User ${userId} does not exist`);
    user = (await db.insert(users).values({ id: userId }).returning())[0];
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
  level,
}: {
  skillId: Skill["id"];
  level: number;
}) => {
  const { userId } = auth();

  let user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (user) {
  } else {
    user = (await db.insert(users).values({ id: userId }).returning())[0];
  }

  await db
    .insert(usersSkillsLevels)
    .values({
      skillId,
      userId,
      level,
    })
    .onConflictDoUpdate({
      target: [usersSkillsLevels.userId, usersSkillsLevels.skillId],
      set: { level },
      where: and(
        eq(usersSkillsLevels.userId, userId),
        eq(usersSkillsLevels.skillId, skillId)
      ),
    });
};
