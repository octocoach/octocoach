import { Breadcrumbs } from "@components/breadcrumbs";
import { authOrRedirect } from "@helpers/auth";
import { getBaseUrl } from "@helpers/navigation";
import { orgDb } from "@octocoach/db/connection";
import { and, asc, desc, eq, sql } from "@octocoach/db/operators";
import { mkUsersSkillLevelsTable } from "@octocoach/db/schemas/org/users-skill-levels";
import { mkUsersTaskInterestTable } from "@octocoach/db/schemas/org/users-task-interest";
import {
  employerTable,
  jobTable,
  skillCategoryTable,
  skillsTasksTable,
  skillSubcategoryTable,
  skillTable,
  taskTable,
} from "@octocoach/db/schemas/public/schema";
import { Card, Markdown, Stack, Text } from "@octocoach/ui";
import { notFound } from "next/navigation";

import type { Params as ParentParams } from "../../../../types";
import { Skill } from "./skill";
import { Task, type TaskSkill } from "./task";

export type Params = ParentParams & { params: { jobId: number } };

export default async function Page({ params: { orgSlug, jobId } }: Params) {
  const session = await authOrRedirect(orgSlug);

  const baseUrl = getBaseUrl();

  const db = orgDb(orgSlug);

  const usersTaskInterestTable = mkUsersTaskInterestTable(orgSlug);
  const usersSkillLevelsTable = mkUsersSkillLevelsTable(orgSlug);

  const job = await db
    .select({
      title: jobTable.title,
      location: jobTable.location,
      description: jobTable.description,
      employer: employerTable.name,
    })
    .from(jobTable)
    .innerJoin(employerTable, eq(employerTable.id, jobTable.employerId))
    .where(eq(jobTable.id, jobId))
    .then((rows) => rows[0]);

  const tasks = await db
    .select({
      id: taskTable.id,
      description: taskTable.description,
      interest: usersTaskInterestTable.interest,
      skills: sql<TaskSkill[]>`
      json_agg(
        json_build_object(
            'id', ${skillTable.id},
            'name', ${skillTable.name},
            'level', ${usersSkillLevelsTable.skillLevel}))`,
    })
    .from(taskTable)
    .innerJoin(
      usersTaskInterestTable,
      and(
        eq(usersTaskInterestTable.taskId, taskTable.id),
        eq(usersTaskInterestTable.userId, session.user.id)
      )
    )
    .leftJoin(skillsTasksTable, eq(skillsTasksTable.taskId, taskTable.id))
    .innerJoin(skillTable, eq(skillTable.id, skillsTasksTable.skillId))
    .leftJoin(
      usersSkillLevelsTable,
      and(
        eq(usersSkillLevelsTable.userId, session.user.id),
        eq(usersSkillLevelsTable.skillId, skillTable.id)
      )
    )
    .where(and(eq(taskTable.jobId, jobId)))
    .groupBy(({ interest, id }) => [id, interest])
    .orderBy(({ interest }) => desc(interest));

  const skills = await db
    .selectDistinct({
      id: skillTable.id,
      name: skillTable.name,
      category: skillCategoryTable.name,
      subcategory: skillSubcategoryTable.name,
      level: usersSkillLevelsTable.skillLevel,
    })
    .from(taskTable)
    .innerJoin(skillsTasksTable, eq(skillsTasksTable.taskId, taskTable.id))
    .innerJoin(skillTable, eq(skillsTasksTable.skillId, skillTable.id))
    .innerJoin(
      skillSubcategoryTable,
      eq(skillSubcategoryTable.id, skillTable.subcategoryId)
    )
    .innerJoin(
      skillCategoryTable,
      eq(skillSubcategoryTable.categoryId, skillCategoryTable.id)
    )
    .innerJoin(
      usersSkillLevelsTable,
      and(
        eq(usersSkillLevelsTable.userId, session.user.id),
        eq(usersSkillLevelsTable.skillId, skillTable.id)
      )
    )
    .where(eq(taskTable.jobId, jobId))
    .orderBy(({ name }) => asc(name));

  if (!job) notFound();

  return (
    <Stack>
      <Breadcrumbs baseUrl={baseUrl} crumbs={["discover", "jobs", job.title]} />
      <Text size="l">
        {job.employer} - {job.location}
      </Text>
      <Text variation="casual">Tasks</Text>
      <Stack>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Stack>
      <Text variation="casual">Skills</Text>
      <Card>
        <Stack direction="horizontal" wrap>
          {skills.map((skill) => (
            <Skill key={skill.id} skill={skill} />
          ))}
        </Stack>
      </Card>
      <Markdown>{job.description}</Markdown>
    </Stack>
  );
}
