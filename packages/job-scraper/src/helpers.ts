import camelCase from "just-camel-case";
import { Browser, Page, devices } from "playwright";
import { Job } from "./interfaces";

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

export const extractJobDetails = async (page: Page): Promise<Job | null> => {
  await sleep(1000);

  const headerContainer = await page.locator(".jobsearch-InfoHeaderContainer");

  if (!headerContainer) return null;

  const title = (
    await (
      await headerContainer.locator(".jobsearch-JobInfoHeader-title")
    ).innerText({ timeout: 2000 })
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

  return {
    description,
    employerId,
    location,
    moreDetails,
    title,
  };
};

export const getTotalAds = async (
  page: Page,
  keyword: string
): Promise<number> => {
  await page.screenshot({ path: `${keyword}.png` });

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
  };
  const makeLanguageParam = (code: string) => `0bf:exrec(),kf:attr(${code});`;
  const url = new URL("https://de.indeed.com/jobs");
  url.searchParams.append("q", query);
  url.searchParams.append("l", location);
  url.searchParams.append(
    "sc",
    makeLanguageParam(languages[programmingLanguage])
  );
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
