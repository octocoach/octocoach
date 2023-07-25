import { db, end } from "@octocoach/db/src/connection";
import { chromium } from "playwright";
import { IndeedScraper } from "./indeed/index";

const browser = await chromium.launch({ headless: true });
const indeedScraper = new IndeedScraper(browser, db);

await indeedScraper.scrape({
  age: 1,
  locations: ["Düsseldorf", "Köln"],
  queries: ["Web Developer"],
});

await browser.close();
await end();
