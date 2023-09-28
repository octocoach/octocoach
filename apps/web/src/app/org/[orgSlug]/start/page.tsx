import { orgDb } from "@octocoach/db/connection";
import shuffle from "just-shuffle";
import TaskCheck from "./task-check";

export const runtime = "nodejs";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const db = orgDb(params.orgSlug);

  const tasks = shuffle(
    await db.query.taskTable.findMany({
      with: {
        usersTasksInterest: true,
        tasksToSkills: {
          with: {
            skill: {
              with: {
                usersSkillsLevels: true,
              },
            },
          },
        },
      },
    })
  );

  return <TaskCheck tasks={tasks} />;
}
