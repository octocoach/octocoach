"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@octocoach/db/src/connection";
import { users } from "@octocoach/db/src/schema/users";
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
