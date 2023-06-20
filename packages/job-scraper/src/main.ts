import { Locator, Page, chromium } from "playwright";
import UserAgent from "user-agents";
import {
  cleanPage,
  extractJobDetails,
  getTotalAds,
  makeUrl,
  sleep,
} from "./helpers";

const userAgent = new UserAgent({ deviceCategory: "desktop" });
const browser = await chromium.launch({ headless: true });

const keywords = ["Frontend", "Backend", "Full Stack"];

const getJobsPage = async (page: Page, nextPage$: Locator) => {
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
      if ((await nextPage$.count()) > 0) {
        await nextPage$.click();
      }
    } catch (err) {
      console.error(err);
      await page.screenshot({ path: `error-${Date.now()}.png` });
    }
  }
};

for (const keyword of keywords) {
  const context = await browser.newContext({
    userAgent: userAgent.toString(),
    recordVideo: { dir: "videos/" },
  });

  const page = await context.newPage();
  await page.goto(
    makeUrl({
      query: keyword,
      location: "Düsseldorf",
      programmingLanguage: "JavaScript",
      age: 30,
    })
  );
  await sleep(3000);
  await cleanPage(page);

  const totalAds = await getTotalAds(page, keyword);
  console.log(`\n\n${keyword}: ${totalAds} jobs\n=========================`);

  const nextPage$ = page.locator("[aria-label='Next Page']");

  do {
    await getJobsPage(page, nextPage$);
  } while ((await nextPage$.count()) > 0);

  if (await nextPage$.count()) await page.close();
  await context.close();
}

await browser.close();
