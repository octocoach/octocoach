import { readFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

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

if (obj.dokumente?.norm) {
  for (const { metadaten, textdaten } of obj.dokumente.norm) {
    if (metadaten.enbez) {
      console.log(
        `${metadaten.enbez} ${metadaten.titel ? metadaten.titel : ""}`
      );
      const paragraph = textdaten?.text?.Content?.P;
      if (paragraph) {
        if (typeof paragraph === "string") {
          console.log("Paragraph", paragraph);
        } else if (Array.isArray(paragraph)) {
          for (const p of paragraph) {
            if (p.DL) {
              if (p["#text"]) {
                console.log("Absatz", p["#text"].match(/\d/)[0]);
              }
              console.log(
                parseDL(p.DL)
                  .map((p) => `Satz ${p.dt} ${p.dd}`)
                  .join("\n")
              );
            } else {
              console.log("Absatz ", p);
            }
          }
        }
      }
    }
  }
}
