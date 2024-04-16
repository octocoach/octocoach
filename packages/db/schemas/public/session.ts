import { pgTable } from "drizzle-orm/pg-core";

import { mkSessionCols } from "../common/session";
import { userTable } from "./user";

export const sessionTable = pgTable("session", mkSessionCols(userTable));
