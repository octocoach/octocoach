import got from "got";
import { nanoid } from "nanoid";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Octokit } from "octokit";
import { connectionString } from "../config/connection";
import run from "../helpers/run";

const drizzleKitVersion = "0.19.13";

export default async function createOrg(slug: string) {
  "use server";
  const runId = nanoid(6);
  const configDir = `config_${runId}`;
  const schemaDir = `schema_${runId}`;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data: schemaFiles } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "octocoach",
      repo: "octocoach",
      path: "packages/db/src/org/schema",
      ref: "avanderbergh/issue70",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!Array.isArray(schemaFiles)) {
    throw new Error("Expected array of files");
  }

  await mkdir(schemaDir);

  for (const file of schemaFiles) {
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

  await mkdir(configDir);

  await writeFile(join(configDir, "org.drizzle.config.ts"), drizzleConfig);

  const command = `npx drizzle-kit@${drizzleKitVersion} push:pg --config=./${configDir}/org.drizzle.config.ts`;

  console.log(await run(command, { env: { SLUG: slug } }));

  console.log("Cleaning up 🧹...");
  await rm(schemaDir, { recursive: true });
  await rm(configDir, { recursive: true });
  console.log("Done 🎉");
}
