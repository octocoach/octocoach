import type { Adapter } from "@auth/core/adapters";
import { PgDatabase } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { users } from "./schema/schema";

export function authDrizzleAdapter(
  db: InstanceType<typeof PgDatabase>
): Adapter {
  return {
    async createUser(data) {
      return await db
        .insert(users)
        .values({ ...data, id: nanoid() })
        .returning()
        .then((rows) => rows[0] ?? null);
    },
  };
}
