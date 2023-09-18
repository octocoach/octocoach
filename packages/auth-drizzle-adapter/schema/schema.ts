import { pgTable } from "drizzle-orm/pg-core";
import { userColumns } from "./columns";

const slug = process.env.SLUG;

export const users = pgTable("user", userColumns);
