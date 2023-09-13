import got from "got";
import minimist from "minimist";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Octokit } from "octokit";
import run from "./helpers/run";
import { connectionString } from "./config/connection";

const { slug } = minimist(process.argv.slice(2));

console.log("Slug from GetSchema", { slug });

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

const schemaDir = await mkdtemp(join(tmpdir(), "migration-"));

for (const file of files) {
  if (!file.download_url) continue;

  const body = await got(file.download_url).text();

  await writeFile(join(schemaDir, file.name), body, "utf-8");
}

const orgSlug = `org_${slug}`;

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

console.log(
  data
    .toString()
    .replace("{slug}", slug)
    .replace("{schemaDir}", schemaDir)
    .replace("{connectionString}", connectionString)
);

// const version = "0.19.13";

// console.log(`Generating schema for ${orgSlug}`);

// const command = `npx drizzle-kit@${version} push:pg --schema="${schemaDir}/*.ts" --connectionString="${connectionString}" --tablesFilter="${orgSlug}*" --verbose`;

// console.log(command);

// console.log(await run(command, { env: { SLUG: orgSlug } }));
