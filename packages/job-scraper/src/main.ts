import { chromium } from "playwright";
import UserAgent from "user-agents";
import { cleanPage, extractJobDetails, getTotalAds, makeUrl } from "./helpers";

const ua = new UserAgent({ deviceCategory: "desktop" });
const browser = await chromium.launch({ headless: true });

const userAgent = ua.toString();
console.log(userAgent);

const context = await browser.newContext({ userAgent: userAgent.toString() });

const languages = {
  JavaScript: "JB2WC",
  NodeJS: "6M28R",
};

const keywords = ["TypeScript", "React", "JavaScript"];

for (const keyword of keywords) {
  const page = await context.newPage();
  await page.goto(
    makeUrl({
      query: keyword,
      location: "Düsseldorf",
      programmingLanguage: "JavaScript",
      age: 1,
      languages,
    })
  );
  await cleanPage(page);

  try {
    const totalAds = await getTotalAds(page);
  } catch (e) {}

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
        console.log(job);
      }
    } catch (err) {
      console.error(err);
      await page.screenshot({ path: "error.png" });
    }
  }

  await page.close();
}

await context.close();
await browser.close();
