import { ChainTool } from "langchain/tools";
import { chain } from "./chain.js";

export const baTool = new ChainTool({
  name: "bundesagentur documents",
  description:
    "Documents related to AZAV downloaded from the Bundesagentur für Arbeit's website - Good for when you need official information.",
  chain,
});
