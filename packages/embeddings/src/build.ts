import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pineconeIndex } from "./pinecone-index.js";

const loader = new DirectoryLoader("docs", {
  ".pdf": (path) => new PDFLoader(path),
});
const docs = await loader.load();

await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
  pineconeIndex,
});
