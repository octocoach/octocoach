import * as domUtils from "domutils";
import { got } from "got";
import { gotScraping } from "got-scraping";
import * as htmlparser2 from "htmlparser2";
import { Document } from "langchain/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import cliProgress from "cli-progress";

export const loadDocuments = async () => {
  const { body } = await gotScraping.get(
    "https://www.arbeitsagentur.de/institutionen/bildungstraeger/downloads-bildungstraeger"
  );

  const dom = htmlparser2.parseDocument(body);
  const main = domUtils.findOne((e) => e.tagName === "main", dom.childNodes);
  if (!main?.childNodes) throw Error("Main has no child nodes");

  const categories = domUtils.findAll(
    (e) => e.tagName === "div",
    main.childNodes
  );

  const docs: Document<Record<string, any>>[] = [];

  const b1 = new cliProgress.SingleBar({});
  b1.start(categories.length, 0);

  for (const c of categories) {
    const $category = domUtils.findOne((e) => e.tagName === "h2", c.childNodes);
    if (!$category) continue;

    const $anchors = domUtils.getElementsByTagName("a", c.childNodes);
    for (const $anchor of $anchors) {
      const href = domUtils.getAttributeValue($anchor, "href");
      const $title = domUtils.findOne(
        (e) => domUtils.getAttributeValue(e, "class") === "h5",
        $anchor.childNodes
      );
      if (!$title) throw Error("Could not find link title");

      const category = domUtils.innerText($category);
      const title = domUtils.innerText($title);

      if (href && title) {
        const buffer = await got.get(href).buffer();
        const blob = new Blob([buffer]);

        if (!blob) throw Error("Blob is empty");

        try {
          const loader = new PDFLoader(blob);
          docs.push(
            ...(await loader.load()).map((d) => ({
              ...d,
              metadata: { ...d.metadata, category, source: href },
            }))
          );
        } catch (err) {
          console.log(`${title}: ${err}`);
        }
      }
    }
    b1.increment();
  }
  b1.stop();

  return docs;
};
