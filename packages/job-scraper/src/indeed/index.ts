import { employers } from "@octocoach/db/src/schema/employers";
import snakeCase from "just-snake-case";
import { Locator } from "playwright";
import { JobScraper } from "../job-scraper";

export class IndeedScraper extends JobScraper {
  nextPageSelector = "[aria-label='Next Page']";

  buildUrl({ age, location, pageNo, query }) {
    const url = new URL("https://de.indeed.com/jobs");

    url.searchParams.append("q", query);
    url.searchParams.append("l", location);
    url.searchParams.append("fromage", age.toString());
    url.searchParams.append("filter", "1");
    url.searchParams.append("sort", "date");
    if (pageNo) {
      url.searchParams.append("start", `${pageNo * 10}`);
    }

    return url.toString();
  }

  async cleanPage(): Promise<void> {
    try {
      await this.page.getByText("Alle ablehnen").click({ timeout: 1000 });
    } catch (e) {}

    // Close the Continue with Google Modal
    try {
      await this.page.evaluate(() => {
        // @ts-ignore
        if (window.hasOwnProperty("closeGoogleOnlyModal"))
          // @ts-ignore
          window.closeGoogleOnlyModal();
      });
    } catch (err) {}

    const close$ = this.page
      .locator("[role=dialog]")
      .locator("[aria-label=schließen]");

    try {
      for (const e of await close$.all()) {
        await this.sleep(500);
        await e.click({ timeout: 3000 });
      }
    } catch (e) {}
  }

  async processCurrentPage(): Promise<void> {
    const items = await this.page
      .locator("ul.jobsearch-ResultsList > li")
      .filter({ has: this.page.locator("h2") })
      .all();

    try {
      for (const item of items) {
        const id = await item.locator("[data-jk]").getAttribute("data-jk");
        if (!id) {
          console.error("Can't get ID");
          continue;
        }

        await item.click();

        const $header = await this.page.locator(
          ".jobsearch-InfoHeaderContainer"
        );

        const $description = await this.page.locator(
          ".jobsearch-JobComponent-description"
        );

        const $company = await $header.locator("[data-company-name=true]");

        const title = (
          await (
            await $header.locator(".jobsearch-JobInfoHeader-title")
          ).innerText()
        )
          .replace("- job post", "")
          .trim();

        const companyName = await $company.innerText();
        const sourceId = await this.getCompanyId($company);

        let company = await this.db.query.employers.findFirst({
          where: (employers, { eq }) => eq(employers.indeed, sourceId),
        });

        if (!company) {
          const newCompany = await this.db
            .insert(employers)
            .values({
              name: companyName,
              indeed: sourceId,
            })
            .returning();

          company = newCompany[0];
        }

        const location = await (
          await $header
            .locator("div > div > div > div:nth-child(2) > div")
            .filter({ hasNotText: /Bewertungen/ })
        )?.innerText();

        const description = await (
          await $description?.locator("#jobDescriptionText")
        )?.innerText();

        await this.processJob({
          source: "indeed",
          sourceId,
          title,
          description,
          employer: company.id,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCompanyId(locator: Locator): Promise<string> {
    const href = await locator
      .locator("a")
      .getAttribute("href", { timeout: 500 });

    if (href) {
      const url = new URL(href);
      return url.pathname.replace("/cmp/", "");
    } else {
      return snakeCase(`unknown_${await locator.innerText()}`);
    }
  }
}
