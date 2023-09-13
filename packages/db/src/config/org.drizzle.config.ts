import { Config } from "drizzle-kit";

export default {
  schema: "{schemaDir}/*.ts",
  schemaFilter: "org_{slug}",
  dbCredentials: {
    connectionString: "{connectionString}",
  },
  verbose: true,
} satisfies Config;
