import { getServerSessionOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { and, desc, eq, gte, isNull } from "@octocoach/db/operators";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import {
  jobTable,
  skillTable,
  skillsTasksTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Text } from "@octocoach/ui";
import { addUserSkillLevel, addUserTaskInterest } from "./actions";
import { SkillCheck } from "./skill-check";
import { TaskCheck } from "./task-check";

export default async function Page({
  params,
}: {
  params: { orgSlug: string };
}) {
  const session = await getServerSessionOrRedirect(params.orgSlug);

  const db = orgDb(params.orgSlug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(params.orgSlug);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(params.orgSlug);

  const skill = await db
    .select({
      id: skillTable.id,
      name: skillTable.name,
      description: skillTable.description,
    })
    .from(usersTaskInterestTable)
    .innerJoin(
      skillsTasksTable,
      eq(skillsTasksTable.taskId, usersTaskInterestTable.taskId)
    )
    .innerJoin(skillTable, eq(skillTable.id, skillsTasksTable.skillId))
    .leftJoin(
      usersSkillLevelsTable,
      and(
        eq(usersSkillLevelsTable.skillId, skillTable.id),
        eq(usersSkillLevelsTable.userId, session.user.id)
      )
    )
    .where(
      and(
        isNull(usersSkillLevelsTable.skillLevel),
        eq(usersTaskInterestTable.userId, session.user.id),
        gte(usersTaskInterestTable.interest, 0)
      )
    )
    .orderBy(desc(usersTaskInterestTable.interest))
    .limit(1)
    .then((row) => (row.length > 0 ? row[0] : null));

  if (skill) {
    const boundAddUserSkillLevel = addUserSkillLevel.bind(
      "orgSlug",
      params.orgSlug
    );

    return <SkillCheck skill={skill} submitAnswer={boundAddUserSkillLevel} />;
  }

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

  const boundAddUserTaskInterest = addUserTaskInterest.bind(
    "orgSlug",
    params.orgSlug
  );

  return <TaskCheck task={task} submitAnswer={boundAddUserTaskInterest} />;
}
