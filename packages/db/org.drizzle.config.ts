import type { Config } from "drizzle-kit";

export default {
  schema: "{schemasDir}/org/migration-schema.ts",
  schemaFilter: "org_{slug}",
  dbCredentials: {
    connectionString: "{connectionString}",
  },
} satisfies Config;
