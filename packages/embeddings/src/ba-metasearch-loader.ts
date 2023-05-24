import { chromium, type Page } from "playwright";
import cliProgress from "cli-progress";
import { got } from "got";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";

async function scrapeNumberOfPages(page: Page) {
  await page.goto(
    "https://web.arbeitsagentur.de/portal/metasuche/suche/information?stichwort=Bildungstr%C3%A4ger&dt=pdf"
  );

  const numberOfPages = await page.evaluate(() => {
    // @ts-ignore

    const paginationElement = document.querySelector("#pagination");
    if (!paginationElement) throw Error("Missing Pagination Element");
    const lastPageButton = Array.from(
      paginationElement.querySelectorAll(
        'button[id^="ba-pagination-page-btn-"]'
      )
    ).pop();
    if (!lastPageButton?.textContent) throw Error("No last page button");
    return parseInt(lastPageButton.textContent.trim(), 10);
  });

  return numberOfPages;
}

async function scrapePage(pageNumber: number, page: Page): Promise<Document[]> {
  const url = `https://web.arbeitsagentur.de/portal/metasuche/suche/information?stichwort=Bildungstr%C3%A4ger&s=${
    pageNumber * 10
  }&dt=pdf`;
  await page.goto(url, { waitUntil: "networkidle" });

  const documents: Document[] = [];

  await page.evaluate(async () => {
    // @ts-ignore
    const articles = Array.from(document.querySelectorAll("article"));

    for (const article of articles) {
      // @ts-ignore
      const title = article.querySelector("h3.title a").textContent.trim();
      // @ts-ignore
      const href = article.querySelector("h3.title a").href;
      // @ts-ignore
      const description = article.querySelector("p.snippet").textContent.trim();

      if (href && title && description) {
        const buffer = await got.get(href).buffer();
        const blob = new Blob([buffer]);

        if (!blob) {
          console.error("Blob is empty");
          continue;
        }
        try {
          const loader = new PDFLoader(blob);
          documents.push(
            ...(await loader.load()).map((d) => ({
              ...d,
              metadata: { ...d.metadata, description, source: href },
            }))
          );
        } catch (err) {
          console.error(`${title}: ${err}`);
          continue;
        }
      }
    }
  });
  return documents;
}

export async function loadDocuments(): Promise<Document[]> {
  const b1 = new cliProgress.SingleBar({});

  const browser = await chromium.launch({
    executablePath:
      "/nix/store/g4nk85h37b92nbliv12q6g3djg9ihcgc-playwright-browsers-chromium/chromium-1048/chrome-linux/chrome",
    headless: false,
  });
  const page = await browser.newPage();
  let pageNumber = 0;
  const totalPages = await scrapeNumberOfPages(page);
  b1.start(totalPages, pageNumber);

  const documents: Document<Record<string, any>>[] = [];

  while (pageNumber < totalPages) {
    const newDocuments = await scrapePage(pageNumber, page);

    documents.push(...newDocuments);
    pageNumber++;
    b1.update(pageNumber);
  }
  await browser.close();
  b1.stop();
  return documents;
}
