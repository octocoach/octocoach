import { db, end, orgDb } from "@octocoach/db/connection";
import { chromium } from "playwright";
import { IndeedScraper } from "./indeed/index";
import { organizationTable } from "@octocoach/db/schemas/public/schema";
import { mkOrgSchema } from "@octocoach/db/schemas/org/schema";

const locationSet = new Set(["Remote"]);
const orgs = await db.select().from(organizationTable);

for (const { slug } of orgs) {
  const { userProfileTable } = mkOrgSchema(slug);
  const newLocations = await orgDb(slug)
    .selectDistinct()
    .from(userProfileTable)
    .then((rows) =>
      rows.filter(({ city }) => !!city).map(({ city }) => city as string)
    );

  for (const newLocation of newLocations) {
    locationSet.add(newLocation);
  }
}

const locations = [...locationSet];

console.log("Locations", locations);

const browser = await chromium.launch({ headless: true });
const indeedScraper = new IndeedScraper(browser, db);

await indeedScraper.scrape({
  age: 7,
  locations,
  queries: ["Web Developer"],
});

await browser.close();
await end();
