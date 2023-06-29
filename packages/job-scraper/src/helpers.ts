import camelCase from "just-camel-case";
import { Browser, Page, devices } from "playwright";
import { Job } from "./interfaces";
import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createExtractionChainFromZod } from "langchain/chains";
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

export const extractJobDetails = async (
  page: Page,
  id: string,
  access_token: string
): Promise<Job | null> => {
  await sleep(1000);

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

  // TODO: We can't use this untill the limit of 50 requests a month is lifted
  // const skills = await extractSkills(description, access_token);
  const tasks = await extractTasks({ description, title });

  const job = {
    id,
    description,
    employerId,
    location,
    moreDetails,
    title,
    skills: [],
    tasks,
  };

  // await parseJob(job);

  return job;
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
("https://de.indeed.com/Jobs?q=Developer&sc=0bf:exrec(),kf:attr(DSQF7)attr(HFDVW)attr(JB2WC)cmpsec(NKR5F)jt(fulltime);&jlid=ecffc05d2bd6a515&lang=en&vjk=a42b1743ca826d61");
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
