import { exec } from "child_process";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { readFile, readdir } from "fs/promises";
import postgres from "postgres";
import { argv } from "process";
import { connectionString } from "./connection";
import run from "./helpers/run";

const slug = argv[2];

const version = "0.19.13";

console.log(`Generating schema for ${slug}`);

await run(
  `npx drizzle-kit@${version} generate:pg --schema="./src/schema/organization/**/*.ts" --out="org_${slug}" ${slug}`
);

// const files = (await readdir(`./org_${slug}`)).filter(
//   (file) => file.split(".")[1] === "sql"
// );

// console.log(`Found ${files.length} SQL files`);

// for (const file of files) {
//   console.log(`Reading ${file}`);

//   console.log(file + "\n");
//   const sql = await readFile(`./org_${slug}/${file}`, "utf-8");
//   console.log(sql);
// }

// console.log("Starting  Migration 🛫");

// const sql = postgres(connectionString, { max: 1 });
// const db = drizzle(sql);
// await migrate(db, {
//   migrationsFolder: `org_${slug}`,
// });

// console.log("Done! 🛬");

// await sql.end();
