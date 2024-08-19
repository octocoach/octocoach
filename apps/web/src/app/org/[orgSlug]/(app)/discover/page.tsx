import { authOrRedirect } from "@helpers/auth";
import { getBaseUrl, orgRedirect } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, desc, eq, gte, isNull } from "@octocoach/db/operators";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import {
  jobTable,
  skillsTasksTable,
  skillTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Stack, Text } from "@octocoach/ui";
import Link from "next/link";

import type { Params } from "../../types";
import { addUserSkillLevel, addUserTaskInterest } from "./actions";
import { getMatchingJobs } from "./helpers";
import { SkillCheck } from "./skill-check";
import { TaskCheck } from "./task-check";

export default async function Page({ params: { orgSlug } }: Params) {
  const session = await authOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(orgSlug);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(orgSlug);

  const jobs = await getMatchingJobs(orgSlug);

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
    return (
      <SkillCheck
        skill={skill}
        submitAnswer={addUserSkillLevel.bind(null, orgSlug)}
      />
    );
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
    .orderBy(desc(jobTable.updated))
    .limit(1)
    .then((rows) => (rows.length ? rows[0] : null));

  const baseUrl = getBaseUrl();

  if (!task) {
    orgRedirect("/discover/jobs");
  }

  return (
    <Stack justify="center">
      <TaskCheck
        task={task!}
        submitAnswer={addUserTaskInterest.bind(null, orgSlug)}
      />
      <Text textAlign="center">
        <Link href={`${baseUrl}discover/jobs`}>
          {jobs.length} possible jobs
        </Link>
      </Text>
    </Stack>
  );
}
