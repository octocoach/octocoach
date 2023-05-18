import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { loadDocuments } from "./ba-loader.js";

const docs = await loadDocuments();

console.log("Creating embeddings...");
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

console.log("Saving vector store...");
await vectorStore.save("vectors/ba-index");

console.log("Done");
