import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Browser, Page, devices } from "playwright";
import { Database } from "@octocoach/db/src/connection";
import { NewJob, jobs } from "@octocoach/db/src/schema/jobs";
import { extractSkills } from "./skills";
import { extractTasks } from "./tasks";

/**
 * This abstract class represents a job scraper that can scrape job postings from various websites.
 * It provides methods for navigating to pages, scraping job postings, and processing job data.
 *
 * @abstract
 */
export abstract class JobScraper {
  /**
   * The current page being scraped.
   *
   * @protected
   */
  protected page: Page;

  /**
   * An instance of the OpenAIEmbeddings class for generating embeddings of job descriptions.
   *
   * @protected
   */
  protected openAIEmbeddings: OpenAIEmbeddings;

  /**
   * Creates an instance of JobScraper.
   *
   * @param {Browser} browser - The Playwright browser instance to use for scraping.
   * @param {Database} db - The database connection to use for storing job data.
   */
  constructor(private browser: Browser, protected db: Database) {
    this.openAIEmbeddings = new OpenAIEmbeddings();
  }

  /**
   * The CSS selector for the "next page" button/link.
   *
   * @abstract
   */
  abstract nextPageSelector: string;

  /**
   * Builds a URL for a job search query.
   *
   * @abstract
   *
   * @param {Object} params - The parameters for the job search query.
   * @param {number} params.age - The maximum age of job postings to include in the search.
   * @param {string} params.location - The location to search for jobs in.
   * @param {number} [params.pageNo] - The page number to start the search on.
   * @param {string} params.query - The search query to use.
   *
   * @returns {string} The URL for the job search query.
   */
  abstract buildUrl({
    age,
    location,
    pageNo,
    query,
  }: {
    age: number;
    location: string;
    pageNo?: number;
    query: string;
  }): string;

  /**
   * Cleans up the current page before scraping job postings.
   *
   * @abstract
   *
   * @returns {Promise<void>} A Promise that resolves when the page has been cleaned up.
   */
  abstract cleanPage(): Promise<void>;

  /**
   * Processes the current page of job postings.
   *
   * @abstract
   *
   * @returns {Promise<void>} A Promise that resolves when the page has been processed.
   */
  abstract processCurrentPage(): Promise<void>;

  /**
   * Navigates to a given URL and sets the current page to the new page.
   *
   * @param {string} url - The URL to navigate to.
   *
   * @returns {Promise<void>} A Promise that resolves when the page has loaded.
   */
  async goToPage(url: string): Promise<void> {
    // Select a random device descriptor to emulate
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

    // Create a new context and page with the selected device
    const context = await this.browser.newContext({ ...device });
    const page = await context.newPage();

    // Set a random viewport size
    const { viewport } = device;
    const width = Math.floor(
      viewport.width - viewport.width * Math.random() * 0.2
    );
    const height = Math.floor(
      viewport.height - viewport.height * Math.random() * 0.2
    );
    await page.setViewportSize({ width, height });

    // Navigate to the URL and close the previous page
    if (this.page) await this.page.close();
    this.page = page;
    await page.goto(url);
  }

  /**
   * Scrapes job postings for a list of search queries.
   *
   * @param {string[]} queries - The list of search queries to use.
   *
   * @returns {Promise<void>} A Promise that resolves when all job postings have been scraped.
   */
  async scrape(queries: string[]) {
    const urlParams = {
      age: 7,
      location: "Düsseldorf",
    };

    for (const query of queries) {
      let pageNo = 0;

      await this.goToPage(this.buildUrl({ ...urlParams, query }));
      await this.sleep(1000);
      await this.cleanPage();
      await this.processCurrentPage();

      while ((await this.page.locator(this.nextPageSelector).count()) > 0) {
        await this.sleep(1000);
        await this.goToPage(
          this.buildUrl({ ...urlParams, query, pageNo: ++pageNo })
        );
        await this.sleep(1000);
        await this.cleanPage();
        await this.processCurrentPage();
      }

      await this.page.close();
    }
  }

  /**
   * Processes a new job posting and inserts it into the database.
   *
   * @param {NewJob} newJob - The new job posting to process.
   *
   * @returns {Promise<void>} A Promise that resolves when the job has been processed.
   */
  async processJob(
    newJob: Omit<NewJob, "titleEmbedding" | "descriptionEmbedding">
  ) {
    const [titleEmbedding, descriptionEmbedding] =
      await this.openAIEmbeddings.embedDocuments([
        newJob.title,
        newJob.description,
      ]);

    const result = await this.db
      .insert(jobs)
      .values({ ...newJob, titleEmbedding, descriptionEmbedding })
      .onConflictDoNothing()
      .returning();

    const job = result[0];

    const skills = await extractSkills(job.description);

    await extractTasks({ db: this.db, job, skills });
  }

  /**
   * Sleeps for a random amount of time between 0.5 and 1.5 times the given timeout.
   *
   * @param {number} timeout - The timeout to sleep for.
   *
   * @returns {Promise<void>} A Promise that resolves when the sleep has finished.
   */
  async sleep(timeout: number = 1000) {
    await new Promise<void>((resolve) => {
      const t = Math.round(timeout + timeout * (Math.random() * 0.5));
      setTimeout(resolve, t);
    });
  }
}
