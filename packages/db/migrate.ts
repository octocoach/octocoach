import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { readFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

import { db, end } from "./connection";
import { organizationTable } from "./schemas/public/schema";

console.log("Migrating public schema...");
await migrate(db, { migrationsFolder: "migrations-public" });
console.log("Migrated public schema");

console.log("Migrating org schemas...");
const orgs = await db.select().from(organizationTable);

const journalAsString = await readFile(
  join(cwd(), "migrations-org/meta/_journal.json"),
  "utf-8"
);

const journalEntries = JSON.parse(journalAsString) as {
  entries: { idx: number; when: number; tag: string; breakpoints: boolean }[];
};

for (const org of orgs) {
  console.log(`Migrating org schema for ${org.slug}...`);

  const schemaVersion = (await db
    .execute(sql.raw(`SELECT max(id) from "org_${org.slug}"."__migrations"`))
    .then(({ rows }) => rows[0]?.max ?? 0)) as number;

  console.log(`Version: ${schemaVersion}`);

  for (const entry of journalEntries.entries) {
    if (entry.idx > schemaVersion) {
      console.log(`Running ${entry.tag}`);

      const rawSQL = (
        await readFile(join(cwd(), `migrations-org/${entry.tag}.sql`), "utf-8")
      ).replaceAll("{slug}", org.slug);

      const statements = rawSQL.split("--> statement-breakpoint");

      await db.transaction(async (tx) => {
        for (const statement of statements) {
          await tx.execute(sql.raw(statement));
        }
        await tx.execute(
          sql.raw(
            `INSERT INTO "org_${org.slug}"."__migrations" VALUES (${entry.idx}, ${entry.when})`
          )
        );
      });
    } else {
      console.log(`Entry ${entry.tag} has already been run`);
    }
  }

  console.log(`Migrated org schema for ${org.slug}`);
}

await end();
