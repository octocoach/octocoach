import { db, end } from "./connection";
import { migrate } from "drizzle-orm/postgres-js/migrator";

console.log("Migrating public schema...");
await migrate(db, { migrationsFolder: "migrations-public" });
console.log("Migrated public schema");
await end();
