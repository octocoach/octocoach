import { Translator } from "deepl-node";

const authKey = process.env.DEEPL_AUTH_KEY;

if (!authKey) throw new Error("Missing DEEPL_AUTH_KEY");

const translator = new Translator(authKey);

const result = await translator.translateText("Hello, world!", null, "fr");
console.log(result.text); // Bonjour, le monde !
