import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

export const vectorStore = await HNSWLib.load(
  "vectors/ba-index",
  new OpenAIEmbeddings()
);

const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-4" });

export const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  {
    returnSourceDocuments: true,
  }
);

const answer = await chain.call({
  question: `For courses in which career category can I charge the most/least for?`,
  chat_history: [],
});

console.log(answer.text);

answer.sourceDocuments.forEach((s: any) => {
  console.log(s.metadata.source);
});
