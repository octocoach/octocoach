import { UnstructuredDirectoryLoader } from "langchain/document_loaders/fs/unstructured";

const options = {
  apiKey: "MY_API_KEY",
};

const loader = new UnstructuredDirectoryLoader("./docs", options);
const docs = await loader.load();

console.log(docs);
