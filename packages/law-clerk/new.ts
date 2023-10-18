import { readFile, writeFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

/**
 * Represents a law (Gesetz) containing multiple paragraphs.
 */
interface Law {
  identifier: string; // Gesetzeskennung
  title: string; // Gesetzestitel
  paragraphs: Paragraph[]; // Paragraphen
}

/**
 * Represents a paragraph (Paragraph) within a law, containing multiple clauses (Absätze).
 */
interface Paragraph {
  title: string; // Paragraphentitel
  number: number; // Paragraphnummer
  text?: string; // Paragraphentext
  clauses?: Clause[]; // Absätze
}

/**
 * Represents a clause (Absatz) within a paragraph, containing text and possibly multiple subpoints (Sätze).
 */
interface Clause {
  number: number; // Absatznummer
  text?: string; // Absatztext
  subclauses?: Subclause[] | Subclause[][]; // Sätze
}

/**
 * Represents a subclause (Satz) within a clause.
 */
interface Subclause {
  number: number; // Satznummer
  text: string; // Satztext
}

const rawText = await readFile("data/AZAV.xml", "utf8");
const parser = new XMLParser();
const obj = parser.parse(rawText);

const parseDL = (dl: {
  DT: string[];
  DD: { LA: string }[];
}): { dt: string; dd: string }[] => {
  if (!Array.isArray(dl)) {
    if (!Array.isArray(dl.DT)) {
      return [];
    } else {
      return dl.DT.map((dt, i) => ({ dt, dd: dl.DD[i].LA }));
    }
  } else {
    return dl.reduce((acc, dl) => [...acc, ...parseDL(dl)], []);
  }
};

const extractNumericValue = (str: string): number | null => {
  const matches = str.match(/\d+/g);
  if (matches && matches.length === 1) {
    return parseInt(matches[0], 10);
  }
  console.warn(`Could not extract numeric value from string: ${str}`);
  return null;
};

const extractNumberAndText = (
  str: string
): { number: number; text: string } => {
  const match = str.match(/\((\d+)\)\s+(.+)/);
  if (match && match.length === 3) {
    return { number: parseInt(match[1], 10), text: match[2].trim() };
  }
  console.log(str);
  throw new Error("Pattern not found");
};

if (!obj.dokumente?.norm) {
  console.error("No norm found");
  process.exit(1);
}

const documentMetadata = obj.dokumente?.norm[0]?.metadaten;
if (!documentMetadata) {
  console.error("No document metadata found");
  process.exit(1);
}

const law: Law = {
  title: documentMetadata.kurzue || "Untitled",
  identifier: documentMetadata.jurabk || documentMetadata.amtbk || "unknown",
  paragraphs: [],
}; // initialize the law object with the Law interface

for (const { metadaten, textdaten } of obj.dokumente.norm) {
  if (metadaten.enbez) {
    const paragraphNumber = extractNumericValue(metadaten.enbez);
    const paragraph: Paragraph = {
      title: paragraphNumber === null ? metadaten.enbez : metadaten.titel,
      number: paragraphNumber ?? 0,
    };
    const paragraphContent = textdaten?.text?.Content?.P;
    if (paragraphContent) {
      if (typeof paragraphContent === "string") {
        paragraph.text = paragraphContent;
      } else if (Array.isArray(paragraphContent)) {
        paragraph.clauses = [];
        for (const p of paragraphContent) {
          if (p.DL) {
            const { number: paraNum, text: paraText } = extractNumberAndText(
              p["#text"]
            );

            const subclauses: Subclause[] = parseDL(p.DL).map((p) => {
              return {
                number: extractNumericValue(p.dt) ?? 0,
                text: p.dd,
              };
            });
            paragraph.clauses.push({
              number: paraNum,
              text: paraText,
              subclauses,
            });
          } else {
            paragraph.clauses.push(extractNumberAndText(p));
          }
        }
      }
    }
    law.paragraphs.push(paragraph); // append the paragraph to the law object
  }
}

await writeFile("build/AZAV.json", JSON.stringify(law)); // write the law object to a JSON file
