import { SQL, SQLChunk, StringChunk, sql } from "drizzle-orm";
import { PgDialect, getTableConfig } from "drizzle-orm/pg-core";
import { argv } from "process";
import superjson from "superjson";
import { db, end } from "./connection";
import { makeOrgSchema } from "./org";

export default async function createOrg(slug: string) {
  console.log("Creating org", slug);

  const orgSlug = `org_${slug}`;

  const res = await db.execute(
    sql.raw(`CREATE SCHEMA IF NOT EXISTS ${orgSlug};`)
  );

  const orgSchema = makeOrgSchema(slug);

  const { name, schema, columns } = getTableConfig(orgSchema.members);

  let statement = `CREATE TABLE IF NOT EXISTS "${schema}"."${name}" (
`;

  const pgDialect = new PgDialect();

  const makeDefaultStatment = (d: SQL) =>
    d.queryChunks.reduce((acc, curr: SQLChunk) => {
      const c = curr as StringChunk;
      return `${acc} ${c.value.join(" ")}`.trim();
    }, "");

  for (const [i, c] of columns.entries()) {
    const d = c.default as SQL;

    const primaryKeyStatement = c.primary ? " PRIMARY KEY" : "";

    const defaultStatement = c.hasDefault
      ? ` DEFAULT ${makeDefaultStatment(d)}`
      : "";

    const notNullStatement = c.notNull ? " NOT NULL" : "";

    const uniqueConstraintStatement = c.isUnique
      ? ` CONSTRAINT "${c.uniqueName}" UNIQUE`
      : "";

    statement += `"${
      c.name
    }" ${c.getSQLType()}${primaryKeyStatement}${defaultStatement}${notNullStatement}${uniqueConstraintStatement}`;

    statement += i === columns.length - 1 ? "\n" : ",\n";
  }

  statement += `);
`;

  console.log(statement);
}

await createOrg(argv[2]);
await end();
