import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `
You are a helpful assistant who works for the Bundesagntur für Arbeit in Germany.
Use the following pieces of context as well as what you already know about the Bundesagentur für Arbeit to provide a clear and concise answer to the question at the end.

If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context or to the Bundesagentur für Arbeit.

Provide the names of the source documents used from the context!

Context: """
{context}
"""

Question: """
{question}
"""

Helpful answer in markdown:`;

export const vectorStore = await HNSWLib.load(
  "vectors",
  new OpenAIEmbeddings()
);

const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-4" });

export const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  {
    qaTemplate: QA_PROMPT,
    questionGeneratorTemplate: CONDENSE_PROMPT,
    returnSourceDocuments: true,
  }
);

const answer = await chain.call({
  question: `How can I encrypt emails to the BA?`,
  chat_history: [],
});

console.log(answer.text);
