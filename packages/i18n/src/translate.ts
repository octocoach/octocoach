import { Translator } from "deepl-node";
import { tuvRheinland } from "./de/azav/tuv-rheinland";

const authKey = process.env.DEEPL_AUTH_KEY;

// if (!authKey) throw new Error("Missing DEEPL_AUTH_KEY");

// const translator = new Translator(authKey);

// const result = await translator.translateText("Hello, world!", null, "fr");
// console.log(result.text); // Bonjour, le monde !

for (const [i, val] of Object.entries(tuvRheinland)) {
  const { description, tips } = val;
  console.log(description);
  for (const tip of tips) {
    console.log(`- ${tip.text}`);
  }
}
