import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Browser, Page, devices } from "playwright";
import { Database } from "@octocoach/db/src/connection";
import { NewJob, jobs } from "@octocoach/db/src/schema/jobs";
import { extractSkills } from "./skills";
import { extractTasks } from "./tasks";

export abstract class JobScraper {
  abstract nextPageSelector: string;

  protected page: Page;

  protected openAIEmbeddings: OpenAIEmbeddings;

  constructor(private browser: Browser, protected db: Database) {
    this.openAIEmbeddings = new OpenAIEmbeddings();
  }

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

  abstract cleanPage(): Promise<void>;

  abstract processCurrentPage(): Promise<void>;

  async goToPage(url: string): Promise<void> {
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

    const context = await this.browser.newContext({
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

    await page.goto(url);

    if (this.page) await this.page.close();
    this.page = page;
  }

  async scrape(queries: string[]) {
    for (const query of queries) {
      let pageNo = 0;
      const urlParams = {
        age: 7,
        location: "Düsseldorf",
        query,
      };

      await this.goToPage(this.buildUrl({ ...urlParams }));
      await this.sleep(1000);
      await this.cleanPage();

      await this.processCurrentPage();

      while ((await this.page.locator(this.nextPageSelector).count()) > 0) {
        await this.sleep(1000);
        await this.goToPage(this.buildUrl({ ...urlParams, pageNo: ++pageNo }));
        await this.sleep(1000);
        await this.cleanPage();

        await this.processCurrentPage();
      }

      await this.page.close();
    }
  }

  async sleep(timeout: number) {
    await new Promise<void>((resolve) => {
      const t = Math.round(timeout + timeout * (Math.random() * 0.5));
      setTimeout(() => {
        resolve();
      }, t);
    });
  }

  async processJob(newJob: NewJob) {
    const result = await this.db
      .insert(jobs)
      .values(newJob)
      .onConflictDoNothing()
      .returning();

    const job = result[0];

    const skills = await extractSkills(job.description);

    await extractTasks({ db: this.db, job, skills });
  }
}
