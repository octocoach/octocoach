import { db } from "@octocoach/db/src/connection";
import shuffle from "just-shuffle";
import TaskCheck from "./task-check";

export const runtime = "nodejs";

export default async function Page() {
  const tasks = shuffle(
    await db.query.tasks.findMany({
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
