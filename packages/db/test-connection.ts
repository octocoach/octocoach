import { sql } from "drizzle-orm";
import { db, end } from "./connection";
import { taskTable } from "./schemas/common/task";

const result = await db.execute(sql.raw("select 1"));

console.log(result);

await end();

console.log("done");
