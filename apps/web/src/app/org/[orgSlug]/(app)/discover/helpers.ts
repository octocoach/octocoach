import { getServerSessionOrRedirect } from "@helpers/auth";
import { orgDb } from "@octocoach/db/connection";
import { employerTable } from "@octocoach/db/schemas/common/employer";
import { jobTable } from "@octocoach/db/schemas/common/job";
import { taskTable } from "@octocoach/db/schemas/common/task";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import { and, desc, eq, gt, sql } from "drizzle-orm";

export const getMatchingJobs = async (orgSlug: string) => {
  const session = await getServerSessionOrRedirect(orgSlug);

  const db = orgDb(orgSlug);
  const usersTaskInterestTable = mkUsersTaskInterestTable(orgSlug);

  const jobs = await db
    .select({
      jobTitle: jobTable.title,
      jobId: jobTable.id,
      location: jobTable.location,
      employerName: employerTable.name,
      tasks: sql<number>`cast(count(${taskTable.id}) as int)`,
      interest: sql<number>`cast(sum(${usersTaskInterestTable.interest}) as int)`,
      sort: sql<number>`cast(sum(${usersTaskInterestTable.interest}) as decimal(7,2)) / cast(count(${taskTable.id}) as decimal(7,2))`,
    })
    .from(jobTable)
    .innerJoin(employerTable, eq(employerTable.id, jobTable.employerId))
    .innerJoin(taskTable, eq(taskTable.jobId, jobTable.id))
    .innerJoin(
      usersTaskInterestTable,
      and(
        eq(usersTaskInterestTable.taskId, taskTable.id),
        eq(usersTaskInterestTable.userId, session.user.id)
      )
    )
    .groupBy(jobTable.title, jobTable.id, employerTable.name)
    .having(({ interest }) => gt(interest, 0))
    .orderBy(({ sort, interest }) => sql`${desc(sort)}, ${desc(interest)}`);

  return jobs;
};
