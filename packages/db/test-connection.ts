import { sql } from "drizzle-orm";
import { db, end } from "./connection";

const result = await db.execute(sql.raw("select 1"));
console.log(result);
await end();
