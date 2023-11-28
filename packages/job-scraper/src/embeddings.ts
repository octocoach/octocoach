import OpenAI from "openai";

const openai = new OpenAI();

export const getEmbeddings = async (input: string) => {
  const response = await openai.embeddings.create({
    input,
    model: "text-embedding-ada-002",
  });

  if (response.data.length !== 1) {
    throw new Error(
      `Expected 1 embedding, got ${response.data.length} embeddings`
    );
  }

  return response.data[0].embedding;
};
