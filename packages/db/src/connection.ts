import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as companies from "./schema/companies";
import * as jobs from "./schema/jobs";
import * as organizations from "./schema/organizations";
import * as skills from "./schema/skills";
import * as tasks from "./schema/tasks";
import * as tasksToSkills from "./schema/tasks-to-skills";
import * as users from "./schema/users";
import * as usersTasksInterest from "./schema/users-tasks-interest";
import * as usersSkillsLevels from "./schema/users-skills-levels";
import { makeOrgSchema } from "./schema/organization/members";

const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PW;
const host = "localhost";
const port = 5432;
const database = "octocoach";

export const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

const client = postgres(connectionString);

export const makeDb = ({ orgSlug }: { orgSlug: string }) => {
  return drizzle(client, {
    schema: {
      ...companies,
      ...jobs,
      ...organizations,
      ...skills,
      ...tasks,
      ...tasksToSkills,
      ...users,
      ...usersTasksInterest,
      ...usersSkillsLevels,
      ...makeOrgSchema(orgSlug),
    },
  });
};

export const db = makeDb({ orgSlug: "q15" });

export const end = async () => {
  await client.end();
};

export type Database = typeof db;
