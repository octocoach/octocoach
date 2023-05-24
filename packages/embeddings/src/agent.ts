import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import {
  VectorStoreToolkit,
  createVectorStoreAgent,
  VectorStoreInfo,
} from "langchain/agents";

export const vectorStore = await HNSWLib.load(
  "vectors/ba-index",
  new OpenAIEmbeddings()
);

const vectorStoreInfo: VectorStoreInfo = {
  name: "bundesagentur für arbeit",
  description:
    "training courses, accreditation of educational institutions, funding from the bundesagentur für arbeit",
  vectorStore,
};
const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });

const toolkit = new VectorStoreToolkit(vectorStoreInfo, model);

const agent = createVectorStoreAgent(model, toolkit);

const result = await agent.call({
  input: `What are the requirements for "ausschließlich erfolgsbezogen vergütete Arbeitsvermittlung in versicherungspflichtige Beschäftigung nach §45 (4) S. 3 Nr. 2 SGB III" as part of the SGB III/AZAV certification?`,
});

console.log(`Got output ${result.output}`);
console.log(
  `Got intermediate steps ${JSON.stringify(result.intermediateSteps, null, 2)}`
);
