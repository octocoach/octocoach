import { PineconeClient } from "@pinecone-database/pinecone";

const [apiKey, environment, index] = [
  process.env.PINECONE_API_KEY,
  process.env.PINECONE_ENVIRONMENT,
  process.env.PINECONE_INDEX,
];

if (!apiKey || !environment || !index) {
  throw Error(
    "You need to set the PINECONE_API_KEY & PINECONE_ENVIRONMENT enviroment variables"
  );
}

const client = new PineconeClient();
await client.init({
  apiKey,
  environment,
});
export const pineconeIndex = client.Index(index);
