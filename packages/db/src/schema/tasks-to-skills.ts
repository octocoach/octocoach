import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { skills } from "./skills";
import { tasks } from "./tasks";

export const tasksToSkills = pgTable("tasks_to_skills", {
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id),
  skillId: text("skill_id")
    .notNull()
    .references(() => skills.id),
});

export const tasksToSkillsRelations = relations(tasksToSkills, ({ one }) => ({
  task: one(tasks, {
    fields: [tasksToSkills.taskId],
    references: [tasks.id],
  }),
  skill: one(skills, {
    fields: [tasksToSkills.skillId],
    references: [skills.id],
  }),
}));

export const tasksToSkillsSchema = createInsertSchema(tasksToSkills);

export type TasksToSkills = InferSelectModel<typeof tasksToSkills>;
