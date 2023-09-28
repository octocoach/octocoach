import { relations } from "drizzle-orm";
import { skillTable } from "../common/skill";
import {
  skillSubcategoryTable,
  skillTypeTable,
  skillsTasksTable,
} from "./schema";

export { skillTable };

export const skillRelations = relations(skillTable, ({ one, many }) => ({
  subcategory: one(skillSubcategoryTable, {
    fields: [skillTable.subcategoryId],
    references: [skillSubcategoryTable.id],
  }),
  type: one(skillTypeTable, {
    fields: [skillTable.typeId],
    references: [skillTypeTable.id],
  }),

  skillsTasks: many(skillsTasksTable),
}));
