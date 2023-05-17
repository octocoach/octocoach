import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { AutoGPT } from "langchain/experimental/autogpt";
import { InMemoryFileStore } from "langchain/stores/file/in_memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { baTool } from "./tool.js";
import { ReadFileTool, WriteFileTool } from "langchain/tools";

const memoryStore = new MemoryVectorStore(new OpenAIEmbeddings());
const store = new InMemoryFileStore();

const tools = [
  new ReadFileTool({ store }),
  new WriteFileTool({ store }),
  baTool,
];

const autogpt = AutoGPT.fromLLMAndTools(
  new ChatOpenAI({ temperature: 0 }),
  tools,
  {
    memory: memoryStore.asRetriever(),
    aiName: "Ute",
    aiRole: "Agent at the Bundesagentur für Arbeit",
  }
);

await autogpt.run([
  "Find out how to register as an AZAV training provider in Germany",
  "Compile a list of tasks to complete to become registered as AZAV",
  "Compile the tasks into a plan",
]);
