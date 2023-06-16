import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });

const languages = {
  JavaScript: "JB2WC",
  NodeJS: "6M28R",
};

const makeLanguageParam = (code: string) => `0bf:exrec(),kf:attr(${code});`;

const keywords = ["TypeScript", "React", "JavaScript"];

const makeUrl = ({
  query,
  location,
  programmingLanguage,
  age,
}: {
  query: string;
  location: string;
  programmingLanguage: string;
  age: number;
}) => {
  const url = new URL("https://de.indeed.com/jobs");
  url.searchParams.append("q", query);
  url.searchParams.append("l", location);
  url.searchParams.append(
    "sc",
    makeLanguageParam(languages[programmingLanguage])
  );
  url.searchParams.append("fromage", age.toString());
  return url.toString();
};

for (const keyword of keywords) {
  const page = await browser.newPage();
  await page.goto(
    makeUrl({
      query: keyword,
      location: "Düsseldorf",
      programmingLanguage: "JavaScript",
      age: 1,
    })
  );

  const element = await page.getByText(/^\d+\sStellenanzeigen$/);

  const text = await element.innerHTML();

  const match = text.match(/^(\d+)/);

  if (match?.length) {
    const num = parseInt(match[0]);
    console.log(`${keyword}: ${num}`);
  }

  const items = await page.$$("ul.jobsearch-ResultsList > li");

  if (items) {
    for (const item of items) {
      const link = await item.$("a");

      if (link) {
        await link.click();

        await page.waitForSelector(".jobsearch-InfoHeaderContainer");

        const l = await page.$(".jobsearch-JobComponent");

        console.log(await l?.innerText());
      } else {
        console.log("Link is undefined", await item.innerHTML());
      }
    }
  } else {
    console.log("No Items");
  }

  await page.close();
}

await browser.close();
