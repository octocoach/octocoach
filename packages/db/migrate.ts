import { migrate } from "drizzle-orm/postgres-js/migrator";
import { readFile, unlink, writeFile } from "fs/promises";
import path, { join } from "path";
import { connectionString } from "./config/connection";
import { db, end } from "./connection";
import run from "./helpers/run";
import { organizationTable } from "./schemas/public/schema";
import { cwd } from "process";

console.log("Migrating public schema...");
await migrate(db, { migrationsFolder: "migrations-public" });
console.log("Migrated public schema");

console.log("Migrating org schemas...");
const orgs = await db.select().from(organizationTable);

const configTemplate = await readFile(
  path.join(cwd(), "org.drizzle.config.ts"),
  "utf-8"
);

for (const org of orgs) {
  console.log(`Migrating org schema for ${org.slug}...`);

  const config = configTemplate
    .replace("{slug}", org.slug)
    .replace("{schemasDir}", path.join(cwd(), "schemas"))
    .replace("{connectionString}", connectionString);

  const orgConfigFile = join(cwd(), `${org.slug}.drizzle.config.ts`);

  await writeFile(orgConfigFile, config);

  try {
    await run(`npx drizzle-kit push:pg --config=${orgConfigFile}`, {
      env: { SLUG: org.slug },
    });
  } catch (e) {
    console.error(e);
  }

  await unlink(orgConfigFile);

  console.log(`Migrated org schema for ${org.slug}`);
}

await end();
