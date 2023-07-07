import { Page, chromium } from "playwright";
import { cleanPage, getTotalAds, goToPage, processJob, sleep } from "./helpers";
import { queryBuilder } from "./indeed";

import { end } from "@octocoach/db/src/connection";

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

const processJobsPage = async (page: Page) => {
  const items = await page
    .locator("ul.jobsearch-ResultsList > li")
    .filter({ has: page.locator("h2") })
    .all();

  if (items) {
    try {
      for (const item of items) {
        const id = await item.locator("[data-jk]").getAttribute("data-jk");
        if (!id) {
          console.error("Can't get ID");
          continue;
        }
        await item.click();

        await processJob(page, id);
      }
    } catch (err) {
      console.error(err);
      await page.screenshot({ path: `error-${Date.now()}.png` });
    }
  }
};

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

  await processJobsPage(page);

  while ((await page.locator("[aria-label='Next Page']").count()) > 0) {
    await page.close();
    await sleep(2000);
    page = await goToPage(browser, { ...urlParams, pageNo: ++pageNo });

    await sleep(1000);
    await cleanPage(page);
    await sleep(1000);
    await processJobsPage(page);
  }
  await page.close();
}

await browser.close();

await end();
