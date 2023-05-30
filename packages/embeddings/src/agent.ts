import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import {
  VectorStoreToolkit,
  createVectorStoreAgent,
  VectorStoreInfo,
} from "langchain/agents";

export const createAgent = async ({ indexPath }: { indexPath: string }) => {
  const vectorStore = await HNSWLib.load(indexPath, new OpenAIEmbeddings());

  const vectorStoreInfo: VectorStoreInfo = {
    name: "bundesagentur für arbeit",
    description:
      "training courses, accreditation of educational institutions, funding from the bundesagentur für arbeit",
    vectorStore,
  };
  const model = new OpenAI({ temperature: 0, modelName: "gpt-4" });

  const toolkit = new VectorStoreToolkit(vectorStoreInfo, model);

  return createVectorStoreAgent(model, toolkit);
};
