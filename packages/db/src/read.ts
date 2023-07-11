import { db, end } from "./connection";
import { cosineDistance } from "./embedding";
import { tasks } from "./schema/tasks";

const s = await db
  .select()
  .from(tasks)
  .orderBy(cosineDistance(tasks.embedding, [1, 1, 1]))
  .limit(3);

await end();
