import { db, end } from "./connection";
import { tasks } from "./schema/tasks";
import { cosineDistance } from "./vector";

const s = await db
  .select()
  .from(tasks)
  .orderBy(cosineDistance(tasks.embedding, [1, 1, 1]))
  .limit(3);

await end();
