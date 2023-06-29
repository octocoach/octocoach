import got from "got";

const term = "*Backend-Entwickler (m/w/d) Web-Anwendungen mit C#";

const indeedURL = new URL(
  "https://autocomplete.indeed.com/api/v0/suggestions/norm-job-title?country=DE"
);

indeedURL.searchParams.append("query", term);
indeedURL.searchParams.append("count", "100");

const indeedTitles = (await got.get(indeedURL.toString()).json()) as string[];

console.log(indeedURL.toString());
console.log(indeedTitles);

const kununuURL = new URL(
  "https://www.kununu.com/middlewares/salaries/job-titles?locale=de_DE"
);

kununuURL.searchParams.append("pattern", term);

const kununuTitles = (await got.get(kununuURL.toString()).json()) as string[];

console.log(kununuURL.toString());
console.log(kununuTitles);
