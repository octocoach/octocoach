import { db, end } from "./connection";
import { taskTable } from "./schemas/common/task";

const result = await db.select().from(taskTable);

console.log(result);

await end();

console.log("done");
