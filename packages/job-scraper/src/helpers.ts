import { db } from "@octocoach/db/src/connection";
import { employers } from "@octocoach/db/src/schema/employers";
import { jobs, type Job, type NewJob } from "@octocoach/db/src/schema/jobs";
import { tasks } from "@octocoach/db/src/schema/tasks";
import camelCase from "just-camel-case";
import { createExtractionChainFromZod } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Browser, Page, devices } from "playwright";
import { z } from "zod";
import { extractSkills } from "./skills";
import { extractTasks } from "./tasks";

export const cleanPage = async (page: Page) => {
  // Remove Cookie Banner if present
  try {
    await page.getByText("Alle ablehnen").click({ timeout: 1000 });
  } catch (e) {}

  // Close the Continue with Google Model
  try {
    await page.evaluate(() => {
      // @ts-ignore
      if (window.hasOwnProperty("closeGoogleOnlyModal"))
        // @ts-ignore
        window.closeGoogleOnlyModal();
    });
  } catch (err) {}

  const close$ = page
    .locator("[role=dialog]")
    .locator("[aria-label=schließen]");

  try {
    for (const e of await close$.all()) {
      await sleep(500);
      console.log("click", e);
      await e.click({ timeout: 3000 });
    }
  } catch (e) {}
};

const parseJob = async (job: Job) => {
  const parsedJobSchema = z.object({
    skills: z.array(
      z.object({
        name: z.string(),
        type: z.enum([
          "backendFramework",
          "bundler",
          "database",
          "designPattern",
          "frontendFramework",
          "IDE",
          "programmingLanguage",
          "projectManagement",
          "protocol",
          "softSkill",
          "spokenLanguage",
          "testingFramework",
          "versionControl",
        ]),
        level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
        required: z.boolean().optional(),
      })
    ),

    computerScienceDegreeRequired: z.boolean().optional(),
    yearsExperienceRequired: z.number().nonnegative().optional(),
    contactPerson: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string(),
        salutation: z.enum(["Mr.", "Mrs.", "Ms."]).optional(),
        email: z.string().email(),
        phone: z.string().optional(),
      })
      .optional(),
  });

  const chain = createExtractionChainFromZod(
    parsedJobSchema,
    new ChatOpenAI({ modelName: "gpt-4-0613", temperature: 0 })
  );

  const response = await chain.run(JSON.stringify(job));

  console.log(JSON.stringify(response));
};

export const processJob = async (page: Page, sourceId: string) => {
  await sleep(1000);

  const e = new OpenAIEmbeddings();

  const headerContainer = await page.locator(".jobsearch-InfoHeaderContainer");

  if (!headerContainer) return null;

  const title = (
    await (
      await headerContainer.locator(".jobsearch-JobInfoHeader-title")
    ).innerText()
  )
    .replace("- job post", "")
    .trim();

  const company = await headerContainer.locator("[data-company-name=true]");
  const companyName = await company.innerText();

  let href: string = "";

  try {
    const attr = await company
      .locator("a")
      .getAttribute("href", { timeout: 500 });
    if (!attr) throw new Error("No href attribute");
    href = attr;
  } catch (e) {
    console.warn(`No href for ${await company.innerText()}`);

    return null;
  }

  const url = new URL(href);
  const employerId = url.pathname.replace("/cmp/", "");

  let employer = await db.query.employers.findFirst({
    where: (employers, { eq }) => eq(employers.indeed, employerId),
  });

  if (!employer) {
    const newEmployers = await db
      .insert(employers)
      .values({
        name: companyName,
        indeed: employerId,
      })
      .returning();

    if (!newEmployers.length || !newEmployers[0]) {
      throw new Error("Error while saving new employer");
    }
    employer = newEmployers[0];
  }

  const location = await (
    await headerContainer
      .locator("div > div > div > div:nth-child(2) > div")
      .filter({ hasNotText: /Bewertungen/ })
  )?.innerText();

  const descriptionContainer = await page.locator(
    ".jobsearch-JobComponent-description"
  );

  const description = await (
    await descriptionContainer?.locator("#jobDescriptionText")
  )?.innerText();

  const jobDetails = await descriptionContainer
    ?.locator("#jobDetailsSection > div")
    .filter({ hasNotText: "Stellenbeschreibung" })
    .all();

  const moreDetails: Record<string, string[]> = {};

  for (const d of jobDetails) {
    const heading = camelCase(
      await (await d.locator("div").nth(0)).innerText()
    );
    const values = await d
      .locator("div")
      .nth(1)
      .locator("div > div > div > div")
      .all();
    const x: string[] = [];
    for (const v of values) {
      x.push(await v.innerText());
    }
    if (x.length) moreDetails[heading] = x;
  }

  // const embedding = description?.length
  //   ? await e.embedQuery(`${title}\n\n${description}`)
  //   : null;

  // TODO: We can't use this untill the limit of 50 requests a month is lifted
  // const skills = await extractSkills(description, access_token);

  const newJob: NewJob = {
    source: "indeed",
    sourceId,
    title,
    description,
    employer: employer.id,
  };

  const result = await db
    .insert(jobs)
    .values(newJob)
    .onConflictDoNothing()
    .returning();

  const job = result[0];

  await extractSkills(description);

  const jobTasks = (await extractTasks({ description, title })).map((t) => ({
    ...t,
    job: job.id,
  }));

  await db.insert(tasks).values(jobTasks);
};

export const getTotalAds = async (
  page: Page,
  keyword: string
): Promise<number> => {
  const element = await page.getByText(/^\d+\sStellenanzeigen?$/);

  const text = (await element.innerHTML()).replace(",", "");

  const match = text.match(/^(\d+)/);

  if (!match?.length) {
    throw new Error("Could not get total number of Ads");
  }

  return parseInt(match[0]);
};

export interface URLParams {
  query: string;
  location: string;
  programmingLanguage: string;
  age: number;
  pageNo: number;
}

export const makeUrl = ({
  query,
  location,
  programmingLanguage,
  age,
  pageNo,
}: URLParams) => {
  const languages = {
    JavaScript: "JB2WC",
    NodeJS: "6M28R",
    CSS: "6XQ9P",
  };

  const makeScParam = (code: string) => `0bf:exrec(),kf:attr(${code});`;
  const url = new URL("https://de.indeed.com/jobs");
  url.searchParams.append("q", query);
  url.searchParams.append("l", location);
  url.searchParams.append("sc", makeScParam(languages[programmingLanguage]));
  url.searchParams.append("fromage", age.toString());
  url.searchParams.append("filter", "1");
  url.searchParams.append("sort", "date");
  if (pageNo) {
    url.searchParams.append("start", `${pageNo * 10}`);
  }

  return url.toString();
};

export const sleep = async (timeout: number) => {
  await new Promise<void>((resolve) => {
    const t = Math.round(timeout + timeout * (Math.random() * 0.5));
    setTimeout(() => {
      resolve();
    }, t);
  });
};

export const goToPage = async (
  browser: Browser,
  urlParams: URLParams
): Promise<Page> => {
  const deviceDescriptors = [
    "Desktop Chrome",
    "Desktop Chrome HiDPI",
    "Desktop Edge",
    "Desktop Edge HiDPI",
    "Desktop Firefox",
    "Desktop Firefox HiDPI",
    "Desktop Safari",
  ];

  const device =
    devices[
      deviceDescriptors[Math.floor(Math.random() * deviceDescriptors.length)]
    ];

  const context = await browser.newContext({
    ...device,
  });

  const page = await context.newPage();

  const width = Math.floor(
    device.viewport.width - device.viewport.width * Math.random() * 0.2
  );
  const height = Math.floor(
    device.viewport.height - device.viewport.height * Math.random() * 0.2
  );

  await page.setViewportSize({ width, height });
  const url = makeUrl(urlParams);

  console.log(`${urlParams.query}: page ${urlParams.pageNo}`);
  await page.goto(url);

  return page;
};
