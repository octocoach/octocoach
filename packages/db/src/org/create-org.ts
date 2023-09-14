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

  const tmpDir = join(".tmp", nanoid(6));
  const configDir = join(tmpDir, "config");
  const schemaDir = join(tmpDir, "schema");

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  async function fetchContents(
    owner: string,
    repo: string,
    path: string,
    ref: string,
    outputDir: string
  ) {
    const { data: contents } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
        ref,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!Array.isArray(contents)) {
      throw new Error("Expected array of files/directories");
    }

    // Ensure the directory exists
    await mkdir(outputDir, { recursive: true });

    for (const item of contents) {
      if (item.type === "file" && item.download_url) {
        // Fetch and write the file
        const body = await got(item.download_url).text();
        await writeFile(join(outputDir, item.name), body, "utf-8");
      } else if (item.type === "dir") {
        // If it's a directory, fetch its contents recursively
        await fetchContents(
          owner,
          repo,
          item.path,
          ref,
          join(outputDir, item.name)
        );
      }
    }
  }

  await fetchContents(
    "octocoach",
    "octocoach",
    "packages/db/src/org/schema",
    "avanderbergh/issue70",
    schemaDir
  );

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

  // console.log("Cleaning up 🧹...");

  // await rm(tmpDir, { recursive: true });

  // console.log("Done 🎉");
}
