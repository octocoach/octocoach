import type { Adapter } from "@auth/core/adapters";
import { PgDatabase } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { publicSchema } from "@octocoach/db/schemas/public/schema";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";

export function authDrizzleAdapter(
  db: InstanceType<typeof PgDatabase>,
  org?: string
): Adapter {
  const schema = org ? mkOrgSchema(org) : publicSchema;

  return {
    async createUser(data) {
      return await db
        .insert(schema.userTable)
        .values({ ...data, id: nanoid() })
        .returning()
        .then((rows) => rows[0] ?? null);
    },
  };
}
