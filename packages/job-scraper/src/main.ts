import { Page, chromium } from "playwright";
import {
  cleanPage,
  extractJobDetails,
  getTotalAds,
  goToPage,
  sleep,
} from "./helpers";

const browser = await chromium.launch({ headless: true });

const keywords = ["Web Developer"];

const getJobsPage = async (page: Page) => {
  const items = await page
    .locator("ul.jobsearch-ResultsList > li")
    .filter({ has: page.locator("h2") })
    .all();

  if (items) {
    try {
      for (const item of items) {
        await item.click();
        const job = await extractJobDetails(page);
        if (!job) continue;
        console.log(job.title);
      }
    } catch (err) {
      console.error(err);
      await page.screenshot({ path: `error-${Date.now()}.png` });
    }
  }
};

for (const keyword of keywords) {
  let pageNo = 0;
  const urlParams = {
    query: keyword,
    location: "Düsseldorf",
    programmingLanguage: "JavaScript",
    age: 7,
    pageNo,
  };

  let page = await goToPage(browser, urlParams);

  await sleep(3000);
  await cleanPage(page);

  const totalAds = await getTotalAds(page, keyword);
  console.log(`\n\n${keyword}: ${totalAds} jobs\n=========================`);

  await getJobsPage(page);

  while ((await page.locator("[aria-label='Next Page']").count()) > 0) {
    await page.close();
    await sleep(2000);
    page = await goToPage(browser, { ...urlParams, pageNo: ++pageNo });

    await sleep(1000);
    await cleanPage(page);
    await sleep(1000);
    await getJobsPage(page);
  }
  await page.close();
}

await browser.close();
