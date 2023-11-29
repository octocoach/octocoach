import { getServerSessionOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, desc, eq, isNull } from "@octocoach/db/operators";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import {
  jobTable,
  skillTable,
  skillsTasksTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Text } from "@octocoach/ui";
import { addUserTaskInterest } from "./actions";
import { TaskCheck } from "./task-check";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);

  const db = orgDb(params.orgSlug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(params.orgSlug);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(params.orgSlug);

  const task = await db
    .select({
      id: taskTable.id,
      question: taskTable.question,
    })
    .from(taskTable)
    .innerJoin(jobTable, eq(taskTable.jobId, jobTable.id))
    .leftJoin(
      usersTaskInterestTable,
      and(
        eq(taskTable.id, usersTaskInterestTable.taskId),
        eq(usersTaskInterestTable.userId, session.user.id)
      )
    )
    .where(isNull(usersTaskInterestTable.interest))
    .orderBy(desc(jobTable.created))
    .limit(1)
    .then((rows) => (rows.length ? rows[0] : null));

  if (!task) {
    return (
      <Text size="xl" textAlign="center">
        All Done!
      </Text>
    );
  }

  const skills = await db
    .select({
      id: skillTable.id,
      name: skillTable.name,
      description: skillTable.description,
    })
    .from(skillsTasksTable)
    .innerJoin(skillTable, eq(skillsTasksTable.skillId, skillTable.id))
    .leftJoin(
      usersSkillLevelsTable,
      and(
        eq(usersSkillLevelsTable.skillId, skillTable.id),
        eq(usersSkillLevelsTable.userId, session.user.id)
      )
    )
    .where(
      and(
        eq(skillsTasksTable.taskId, task.id),
        isNull(usersSkillLevelsTable.skillLevel)
      )
    );

  const boundAddUserTaskInterest = addUserTaskInterest.bind(
    "orgSlug",
    params.orgSlug
  );

  return (
    <TaskCheck
      task={task}
      skills={skills}
      submitAnswer={boundAddUserTaskInterest}
    />
  );
}
