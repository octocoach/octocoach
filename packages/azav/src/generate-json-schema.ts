import { zodToJsonSchema } from "zod-to-json-schema";
import { EducationProvider } from "./schema";

import { writeFileSync } from "node:fs";
import path from "node:path";

const jsonSchema = zodToJsonSchema(EducationProvider, {
  errorMessages: true,
});
const obj = JSON.parse(JSON.stringify(jsonSchema));

obj.properties = {
  ...obj.properties,
  $schema: {
    type: "string",
  },
};

console.log(obj);

writeFileSync(path.join(process.cwd(), "schema.json"), JSON.stringify(obj));
