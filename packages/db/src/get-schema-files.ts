import got from "got";
import minimist from "minimist";
import { nanoid } from "nanoid";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Octokit } from "octokit";
import { connectionString } from "./config/connection";
import run from "./helpers/run";

const runId = nanoid(6);

const { slug } = minimist(process.argv.slice(2));

if (!slug) {
  throw new Error("Expected slug");
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const { data: files } = await octokit.request(
  "GET /repos/{owner}/{repo}/contents/{path}",
  {
    owner: "octocoach",
    repo: "octocoach",
    path: "packages/db/src/org",
    ref: "avanderbergh/issue70",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }
);

if (!Array.isArray(files)) {
  throw new Error("Expected array of files");
}

const schemaDir = `schema_${runId}`;

await mkdir(schemaDir);

for (const file of files) {
  if (!file.download_url) continue;

  const body = await got(file.download_url).text();

  await writeFile(join(schemaDir, file.name), body, "utf-8");
}

const { data } = await octokit.request(
  "GET /repos/{owner}/{repo}/contents/{path}",
  {
    owner: "octocoach",
    repo: "octocoach",
    path: "packages/db/src/config/org.drizzle.config.ts",
    ref: "avanderbergh/issue70",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      accept: "application/vnd.github.v3.raw",
    },
  }
);

const drizzleConfig = data
  .toString()
  .replace("{slug}", slug)
  .replace("{schemaDir}", schemaDir)
  .replace("{connectionString}", connectionString);

const configDir = `config_${runId}`;

await mkdir(configDir);

await writeFile(join(configDir, "org.drizzle.config.ts"), drizzleConfig);

const version = "0.19.13";

const command = `npx drizzle-kit@${version} push:pg --config=./${configDir}/org.drizzle.config.ts`;

console.log(command);

console.log(await run(command, { env: { SLUG: slug } }));

console.log("Cleaning up 🧹...");
await rm(schemaDir, { recursive: true });
await rm(configDir, { recursive: true });
console.log("Done 🎉");
