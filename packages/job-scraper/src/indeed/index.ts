import { and, eq, or } from "@octocoach/db/operators";
import { employerTable } from "@octocoach/db/schemas/common/employer";
import { jobTable } from "@octocoach/db/schemas/common/job";
import chalk from "chalk";
import snakeCase from "just-snake-case";
import { Locator } from "playwright";
import { JobScraper } from "../job-scraper";
import blacklist from "./blacklist";

/**
 * IndeedScraper class that extends JobScraper class
 */
export class IndeedScraper extends JobScraper {
  nextPageSelector = "[aria-label='Next Page']";

  /**
   * Builds the URL for the Indeed website based on the search parameters
   * @param age - age of job postings in days
   * @param location - location of job postings
   * @param pageNo - page number of job postings
   * @param query - search query for job postings
   * @returns URL string
   */
  buildUrl({ age, location, pageNo, query }) {
    const url = new URL("https://de.indeed.com/jobs");

    url.searchParams.append("q", query);
    url.searchParams.append("l", location);
    url.searchParams.append("sc", "sc=0bf:exrec();");
    url.searchParams.append("fromage", age.toString());
    url.searchParams.append("filter", "1");
    url.searchParams.append("sort", "date");
    if (pageNo) {
      url.searchParams.append("start", `${pageNo * 10}`);
    }

    return url.toString();
  }

  /**
   * Cleans the current page by closing popups and dialogs
   * @returns Promise that resolves when the page is cleaned
   */
  async cleanPage(): Promise<void> {
    try {
      await this.page.getByText("Alle ablehnen").click({ timeout: 1000 });
    } catch (err) {}

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
    } catch (err) {}
  }

  /**
   * Processes the current page by extracting job information and inserting it into the database
   * @returns Promise that resolves when the page is processed
   */
  async processCurrentPage(): Promise<void> {
    const items = await this.page
      .locator("#mosaic-jobResults ul > li")
      .filter({ has: this.page.locator("h2") })
      .all();

    try {
      for (const item of items) {
        const $dataJk = item.locator("[data-jk]");
        if ((await $dataJk.count()) < 1) {
          console.error("Can't get ID Container");
          continue;
        }
        const sourceId = await $dataJk.getAttribute("data-jk");

        if (!sourceId) {
          console.log("Can't get Source ID");
          continue;
        }

        const client = await this.page.context().newCDPSession(this.page);

        const yDistance = Math.random() * -100 - 100;

        await client.send("Input.synthesizeScrollGesture", {
          x: 0,
          y: 0,
          xDistance: 0,
          yDistance,
          yOverscroll: Math.random() * 10,
          speed: Math.round(Math.random() * 300) + 600,
        });

        await this.sleep(2000);

        const context = await this.newBrowserContext();

        const viewJobPage = await context.newPage();
        await viewJobPage.goto(`https://de.indeed.com/viewjob?jk=${sourceId}`, {
          waitUntil: "domcontentloaded",
        });

        await client.detach();

        const $header = await viewJobPage.locator(
          ".jobsearch-InfoHeaderContainer"
        );

        const $description = await viewJobPage.locator(
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
        const companySourceId = await this.getCompanyId($company);

        if (
          blacklist.map((x) => encodeURIComponent(x)).includes(companySourceId)
        ) {
          console.warn(
            chalk.yellow(`${companyName} is on the blacklist, skipping...`)
          );
          await viewJobPage.close();
          continue;
        }

        let employer = await this.db.query.employerTable.findFirst({
          where: (employers, { eq }) => eq(employers.indeed, companySourceId),
        });

        if (!employer) {
          let companyUrl: string | undefined;

          if (!companySourceId.startsWith("unknown")) {
            const page = await this.browser.newPage();
            const companyPage = await $company
              .locator("a")
              .getAttribute("href");
            if (!companyPage) throw new Error("URL not found");
            await page.goto(companyPage, { waitUntil: "domcontentloaded" });

            const $link = page.locator(
              '[data-testid="companyInfo-companyWebsite"]'
            );

            if ((await $link.count()) > 1) {
              const companyLink = await $link.locator("a").getAttribute("href");

              if (!companyLink) throw new Error("Could not find company link");

              const url = new URL(companyLink);

              companyUrl = url.hostname.split(".").slice(-2).join(".");
            }

            console.log(`${companyName}: ${companyUrl}`);
            await page.close();
          }

          const newCompany = await this.db
            .insert(employerTable)
            .values({
              name: companyName,
              indeed: companySourceId,
              url: companyUrl,
            })
            .returning();

          employer = newCompany[0];
        }

        const location = await (
          await $header
            .locator('[data-testid="inlineHeader-companyLocation"]')
            .filter({ hasNotText: /Bewertungen/ })
        )?.innerText();

        const descriptionHTML = await (
          await $description?.locator("#jobDescriptionText")
        )?.innerHTML();

        await viewJobPage.close();

        const jobs = await this.db
          .select()
          .from(jobTable)
          .where(
            or(
              eq(jobTable.sourceId, sourceId),
              and(
                eq(jobTable.employerId, employer.id),
                eq(jobTable.title, title),
                eq(jobTable.location, location)
              )
            )
          );

        if (jobs.length) {
          const updated = new Date();
          for (const job of jobs) {
            console.log(`${job.title} already exists`);
            await this.db
              .update(jobTable)
              .set({ updated })
              .where(eq(jobTable.id, job.id));
          }
        } else {
          await this.processJob(
            {
              employerId: employer.id,
              location,
              source: "indeed",
              sourceId,
              title,
            },
            descriptionHTML
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Gets the company ID from the company locator
   * @param locator - the company locator
   * @returns the company ID
   */
  async getCompanyId(locator: Locator): Promise<string> {
    if ((await locator.locator("a").count()) > 0) {
      const href = await locator
        .locator("a")
        .getAttribute("href", { timeout: 500 });

      if (!href) throw new Error("Error while getting company logo");

      const url = new URL(href);
      return url.pathname.replace("/cmp/", "");
    } else {
      return snakeCase(
        `unknown_${encodeURIComponent(await locator.innerText())}`
      );
    }
  }
}
