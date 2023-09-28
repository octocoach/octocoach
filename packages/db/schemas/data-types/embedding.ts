import { AnyColumn, sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const embedding = customType<{
  data: number[];
  driverData: string;
}>({
  dataType() {
    return "vector(1536)";
  },

  fromDriver(value: string) {
    return value
      .substring(1, value.length - 1)
      .split(",")
      .map((v) => parseFloat(v));
  },

  toDriver(value: number[]) {
    return JSON.stringify(value);
  },
});

export const cosineDistance = (column: AnyColumn, value: number[]) =>
  sql<number>`${column} <=> ${JSON.stringify(value)}`;

export const makeCosineDistance = async (input: string) => {
  const e = new OpenAIEmbeddings();
  const inputEmbeddings = await e.embedQuery(input);

  return (column: AnyColumn) => cosineDistance(column, inputEmbeddings);
};
