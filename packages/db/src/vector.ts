import { AnyColumn, ColumnBaseConfig, SQL, sql } from "drizzle-orm";
import { PgColumn, PgCustomColumn, customType } from "drizzle-orm/pg-core";

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
