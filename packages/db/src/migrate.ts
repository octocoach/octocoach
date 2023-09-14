import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { connectionString } from "./config/connection";

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

console.log("Starting  Migration 🛫");

await migrate(db, { migrationsFolder: "drizzle" });

console.log("Done! 🛬");

await sql.end();
