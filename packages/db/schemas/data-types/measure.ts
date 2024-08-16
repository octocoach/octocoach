import { pgEnum } from "drizzle-orm/pg-core";

export const measureTypeEnum = pgEnum("measure_type", ["cohort", "individual"]);
