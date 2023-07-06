import { AnyColumn, sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const vector = customType<{
  data: number[];
  driverData: string;
  config?: { dimensions: number };
}>({
  dataType(config) {
    return config?.dimensions ? `vector(${config.dimensions})` : "vector";
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

type Value = number[];
type Operator = "<->" | "<#>" | "<=>";

const makeCompareFunction =
  (operator: Operator) => (column: AnyColumn, value: Value) =>
    sql`${column} ${operator} ${JSON.stringify(value)}`;

export const l2Distance = makeCompareFunction("<->");
export const maxInnerProduct = makeCompareFunction("<#>");
export const cosineDistance = makeCompareFunction("<=>");

export const makeCosineDistance = async (input: string) => {
  const e = new OpenAIEmbeddings();
  const inputEmbeddings = await e.embedQuery(input);

  return (column: AnyColumn) => cosineDistance(column, inputEmbeddings);
};
