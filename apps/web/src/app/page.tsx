import { db } from "@octocoach/db/src/connection";
import { Text } from "@octocoach/ui";
import shuffle from "just-shuffle";

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

  return (
    <main
      style={{
        height: "calc(100vh - 40px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Text>Hello</Text>
    </main>
  );
}
