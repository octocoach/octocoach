import type { Config } from "drizzle-kit";

export default {
  schema: "{schemasDir}/org/migration-schema.ts",
  schemaFilter: "org_{slug}",
  driver: "pg",
  dbCredentials: {
    connectionString: "{connectionString}",
    ssl: true,
  },
} satisfies Config;
