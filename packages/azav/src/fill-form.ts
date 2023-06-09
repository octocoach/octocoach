import Docxtemplater from "docxtemplater";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import PizZip from "pizzip";

import type { EducationProvider } from "./schema";
import { mapToTUVSchema } from "./tuv";

const content = readFileSync(
  resolve(process.cwd(), "data/tuv_form.docx"),
  "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
  nullGetter() {
    return "";
  },
});

const info: EducationProvider = JSON.parse(
  readFileSync(join(process.cwd(), "data/institution.json"), "utf-8")
);

const tuvSchema = mapToTUVSchema(info);

console.log(tuvSchema);

doc.render(tuvSchema);

const buf = doc.getZip().generate({
  type: "nodebuffer",
  compression: "DEFLATE",
});

writeFileSync(join(process.cwd(), "out.docx"), buf);
