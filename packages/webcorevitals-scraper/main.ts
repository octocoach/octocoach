import { google } from "googleapis";
import { ofetch } from "ofetch";

import { SerpResult } from "./types";

const SERPER_KEY = process.env.SERPER_KEY;

if (!SERPER_KEY) throw new Error("Missing key for Serper");

const PAGESPEED_INSIGHTS_KEY = process.env.PAGESPEED_INSIGHTS_KEY;
if (!PAGESPEED_INSIGHTS_KEY)
  throw new Error("Missing key for pageSpeedInsights");

console.log(SERPER_KEY);

const { organic } = await ofetch<SerpResult>(
  "https://google.serper.dev/search",
  {
    method: "POST",
    headers: {
      "X-API-KEY": SERPER_KEY,
      "Content-Type": "application/json",
    },
    body: {
      q: "Building management dusseldorf",
    },
  }
);

// const port = 9222;

// const browser = await chromium.launch({
//   args: [`--remote-debugging-port=${port}`],
// });

// const page = await browser.newPage();

const pageSpeedInsights = google.pagespeedonline({
  version: "v5",
  key: PAGESPEED_INSIGHTS_KEY,
});

for await (const { link, title, position } of organic) {
  console.log(`checking ${title}`);
  const res = await pageSpeedInsights.pagespeedapi.runpagespeed({ url: link });

  console.log("position", position);
  console.log(res.data.lighthouseResult?.categories?.performance?.auditRefs);
  // try {
  //   await page.goto(link);
  //   const result = await playAudit({
  //     page,
  //     port: 9222,
  //     thresholds: {
  //       performance: 0,
  //       accessibility: 0,
  //       "best-practices": 0,
  //       seo: 0,
  //       pwa: 0,
  //     },
  //   });

  //   console.log(`Position: ${position}`);

  //   console.log(result.lhr.audits);
  // } catch (err) {
  //   console.log(err);
  //   continue;
  // }
}

// await browser.close();
