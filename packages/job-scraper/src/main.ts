import { Page, chromium } from "playwright";
import {
  cleanPage,
  extractJobDetails,
  getTotalAds,
  goToPage,
  sleep,
} from "./helpers";
import { queryBuilder } from "./indeed";
import { getAccessToken } from "./skills";
import { Job } from "./interfaces";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });

const queries = [
  queryBuilder({
    keywords: ["react", "angular", "vue", "node", "javascript", "typescript"],
    exclude: ["php", "c#", "java"],
    title: [
      "frontend",
      "front*end",
      "backend",
      "back*end",
      "full*stack",
      "fullstack",
      "web*developer",
      "web*entwickler",
    ],
  }),
];

const access_token = await getAccessToken();

const getJobsPage = async (page: Page): Promise<Job[]> => {
  const items = await page
    .locator("ul.jobsearch-ResultsList > li")
    .filter({ has: page.locator("h2") })
    .all();

  const jobs: Job[] = [];

  if (items) {
    try {
      for (const item of items) {
        const id = await item.locator("[data-jk]").getAttribute("data-jk");
        if (!id) {
          console.error("Can't get ID");
          continue;
        }
        await item.click();
        const job = await extractJobDetails(page, id, access_token);
        if (!job) continue;
        console.log(job.title);
        jobs.push(job);
      }
    } catch (err) {
      console.error(err);
      await page.screenshot({ path: `error-${Date.now()}.png` });
    }
  }
  return jobs;
};

const jobs: Job[] = [];

for (const query of queries) {
  let pageNo = 0;
  const urlParams = {
    query,
    location: "Düsseldorf",
    programmingLanguage: "JavaScript",
    age: 7,
    pageNo,
  };

  let page = await goToPage(browser, urlParams);

  await sleep(3000);
  await cleanPage(page);

  const totalAds = await getTotalAds(page, query);
  console.log(`\n\n${query}: ${totalAds} jobs\n=========================`);

  jobs.push(...(await getJobsPage(page)));

  while ((await page.locator("[aria-label='Next Page']").count()) > 0) {
    await page.close();
    await sleep(2000);
    page = await goToPage(browser, { ...urlParams, pageNo: ++pageNo });

    await sleep(1000);
    await cleanPage(page);
    await sleep(1000);
    jobs.push(...(await getJobsPage(page)));
  }
  await page.close();
}

await writeFile("data.json", JSON.stringify(jobs), "utf-8");

await browser.close();
